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
        field: Name of the field. eg. "Insured"
        context: Context around the data (including the data). eg. "Insured:\n\nABC, Inc and/or Associated"
        Assume that words aprt from 1st and last word in context are data
    """

    return "200"

@app.route("/extract", methods=['POST'])
def extract():
    """Extracts data.

    JSON Args:
        ruleset: Name of the document type eg. Cargo-Slips, Insurance-Documents
        text: Text extracted from document through OCR.

    Returns:
        data: Map of field and corresponding data
    """

    return 'XYZ'

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5122)
