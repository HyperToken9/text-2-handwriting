from flask import Flask, request, send_from_directory, jsonify, send_file
from flask_cors import CORS, cross_origin

import io
import base64

from PIL import Image
import HandwritingFunctions

app = Flask(__name__)
CORS(app)


@app.route("/api/hello")
def hello_world():
    return jsonify({"message": "Hello from Flask!"})


"""
@app.route("/api/generate-pages", methods=["POST"])
@cross_origin()
def generate_pages():

    data = request.get_json()
    text = data.get("text")

    writer_obj = HandwritingFunctions.WritePages("testing", text, "", [False, True, True])
    
    pages = writer_obj.get_pages()

    return {
        "message": "Success",
        "input_id": 
        "num_pages": len(os.listdir(os.path.join("backend", "testing"))) - 1,
    }
"""

GENERATION_CACHE = {}


@app.route("/api/get-page", methods=["GET"])
@cross_origin()
def get_page():
    try:
        text = request.args.get("text")
        page_number = request.args.get("pageNumber", type=int)

        if GENERATION_CACHE.get(text) is None:
            writer_obj = HandwritingFunctions.WritePages(
                "testing", text, "", [False, True, True]
            )
            pages = writer_obj.get_pages()
            GENERATION_CACHE[text] = pages

        pages = GENERATION_CACHE[text]

        img = pages[page_number]

        buffered = io.BytesIO()

        img.save(buffered, format="PNG")

        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        base64_image_data = f"data:image/png;base64,{img_str}"

        # print("Page Number: ", page_number)
        # print("Text: ", text)

        return {
            "message": "Success",
            "page_image": base64_image_data,
            "num_pages": 5,
        }

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get-pdf", methods=["GET"])
@cross_origin()
def get_pdf():

    try:
        directory = os.listdir(os.path.join("backend", "testing"))
        if "testing.pdf" not in directory:
            return jsonify({"message": "PDF not generated"}), 400
        else:
            pdf_path = os.path.join("backend", "testing", "testing.pdf")
            return send_file(pdf_path, as_attachment=True)
            # return send_from_directory(os.path.join('backend', 'testing'), 'testing.pdf', as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5328, debug=True)
