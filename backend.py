from flask import Flask
import time
import json
app = Flask(__name__)

@app.route("/")
def echo():
    return json.dumps({"started":"true"})

@app.route("/add_rule")
def add_rule(field, data, context):
    """Adds rule.

    Args:
        field: Name of the field. eg. "Insured"
        data: Data corresponding to the field. eg. "ABC, Inc"
        context: Context around the data (including the data). eg. "Insured:\n\nABC, Inc and/or Associated"
    """

    pass

@app.route("/extract")
def extract(text, field):
    """Extracts data.

    Args:
        text: Text extracted from document through OCR.
        field: Field corresponding to which we need to extract data.

    Returns:
        data: Data corresponding to the field.
    """

    return 'XYZ'

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5122)
