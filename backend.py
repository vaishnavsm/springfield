from flask import Flask, request
import time
import json
import regex
app = Flask(__name__)
regexps = dict()
ERROR_TOLERANCE = 2

@app.route("/")
def echo():
    return json.dumps({"started":"true"})

@app.route("/add_rule", methods=['POST'])
def add_rule():
    """Adds rule.

    JSON Args:
        ruleset: Name of the document type eg. Cargo-Slips, Insurance-Documents
        tags: a list of field and context
            field: Name of the field. eg. "Insured"
            context: Context around the data (including the data). eg. "Insured:\n\nABC, Inc and/or Associated"
            Assume that words aprt from 1st and last word in context are data

    Demo data:
    {
    	"ruleset":"Cargo Slip",
    	"tags":[
    		{
    			"field":"Company-Name",
    			"context":"are Lloyd & Partners Pvt. Ltd. not"
    		},
    		{
    			"field":"Balance-Paid",
    			"context":"USD 1,500,000 any"
    		},
    		{
    			"field":"Policy-ID",
    			"context":"Reference:        B0000DC1234567000 Attaching"
    		}
    	]
    }
    """

    ruleset = request.json['ruleset']
    regexps[ruleset] = dict()

    for field_dict in request.json['tags']:
        context = field_dict['context']
        field = field_dict['field']
        data = ' '.join(context.split()[1:-1]) # hack
        
        if data in context:
            pattern = context.replace(data, '(.+)')
        else:
            raise Exception('Context should contain data.')
        
        regexps[ruleset][field] = pattern

    return "200"

@app.route("/extract", methods=['POST'])
def extract():
    """Extracts data.

    JSON Args:
        ruleset: Name of the document type eg. Cargo-Slips, Insurance-Documents
        text: Text extracted from document through OCR.

    Demo Data:
    {
        "ruleset":"Cargo Slip",
        "files":[
            {
                "name": "/home/akshay/Downloads/SOV_2.pdf",
                "content": "are Google Inc. not USD 20,000 any Reference:        F0000DC1234567000 Attaching"
            },
            {
                "name": "/home/akshay/Downloads/Sample_2_IIT.pdf",
                "content": "are Facebook LLC. not USD 100,000 any Reference:        F0000FF1234567000 Attaching"
            }
        ]
    }

    Returns:
        data: Map of field and corresponding data
    """

    ruleset = request.json['ruleset']
    output = dict()

    for file_dict in request.json['files']:
        name = file_dict['name'] 
        content = file_dict['content']
        
        output[name] = dict()
        
        regexps_ruleset = regexps.get(ruleset, dict())
        for field in regexps_ruleset.keys():
            regexp = regexps_ruleset[field]
            data = regex.search("(%s){e<=1}" % regexp, content, regex.BESTMATCH).groups()[1]
            output[name][field] = data 

    return output

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5122)
