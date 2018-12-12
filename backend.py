from flask import Flask
import time
import json
app = Flask(__name__)

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

    return "200"

@app.route("/extract", methods=['POST'])
def extract():
    """Extracts data.

    JSON Args:
        ruleset: Name of the document type eg. Cargo-Slips, Insurance-Documents
        text: Text extracted from document through OCR.

    Demo Data:
    {
    	"ruleset":"Insurance Premium",
    	"files":[
    		{
    			"name":"/home/akshay/Downloads/SOV_2.pdf",
    			"data":" It is agreed that notwithstanding anything contained herein to the/
                   contrary that cover hereunder may be extended for up to three/
                   months, if required, subject to the agreement of the Slip Leader. /
                   This Contract may be cancelled either by the Insured or by the /
                   Insurers, by one party giving to the other, 60 days notice in /
                   writing to expire at Any Time, but seven days notice at any time /
                   in respect of War, Strikes, Riots, Civil Commotions and Malicious /
                   Damage Risks except in respect of sendings to or from United /
                   States of America, when Strikes, Riots, Civil Commotions and /
                   Malicious Damage Risks will be subject to forty eight hours notice /
                   of cancellation. Notice, if given, not to apply to any risks which /
                   shall have commenced or been declared prior to termination of /
                   period of notice. /
                   The above notice period is amended to 10 days at the sole /
                   option of the Insured in the event of any Insurer hereon ceasing /
                   to underwrite new insurance business or otherwise implementing /
                   any plans to enter into a run-off position. Such notice is only /
                   given in respect of the named Insurer with such Insurer agreeing /
                   to return to the Insured any annual premium payable hereunder /
                   on a pro-rata basis calculated from the effective date of the/
                   cancellation specified in the notice."
    		},
    		{
    			"name":"/home/akshay/Downloads/Sample_2_IIT.pdf",
    			"data":"Unique Market /
    					Reference:        B0000DC1234567000 /
    Attaching To /
    Delegated /
    Underwriting /
    Contract /
    Number:           Attaching Lloyd  &          Partners    Master     Contract     No /
                      B1000DC1239725000 /
     /
    Type:             Marine Stockthroughput Insurance. /
     /
    Insured:          ABC, Inc and/or Associated and/or Affiliated and/or Interrelated /
                      and/or Subsidiary Companies and/or Corporations as they now /
                      are or may hereafter be created and/or constituted and/or /
                      acquired and/or for whom the Insured receive instructions to  /
                      insure and/or for whom the Insured have or assume a /
                      responsibility to arrange insurance, whether contractually or /
                      otherwise, as their respective rights and interests may appear /
                      hereinafter known as the Insured. /
                      Loss Payee /
                      In accordance with the Insured's business requirements it is /
                      agreed that Banks and/or mortgagees and/or lenders and/or /
                      similar interested parties are to be automatically included as Loss /
                      Payees herein as their respective rights and interests may /
                      appear in the subject-matter insured but only in so far as losses /
                      may be recoverable under the terms and conditions agreed /
                      herein. Details of such loss payee interests to be advised to and /
                      retained in the files of Lloyd & Partners. /
     /
    Address of the /
    Insured:          P O Box 560 /
                      Vance, AL 35490 /
     /
    Period:           Open Cover to take all insurances attaching hereto on or after 7 /
                      February 2018 at 00:01 hours Local Standard Time at the /
                      \"Address of the Insured\" defined above herein. The anniversary  /
                      date of this contract is deemed to be 7 February 2019 at 00:01 /
                      hours Local Standard Time at the “Address of the Insured  /
                      herein."
    		}
    	]
    }

    Returns:
        data: Map of field and corresponding data
    """

    return 'XYZ'

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5122)
