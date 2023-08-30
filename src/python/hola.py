from flask import Flask, request, jsonify, send_file
from openpyxl import load_workbook, Workbook
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto permite solicitudes CORS desde cualquier origen


@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        workbook = load_workbook(uploaded_file)
        sheet = workbook.active

        products = []
        map = {
            1: 'sku',
            2: 'title',
            3: 'brand',
            4: 'category',
            5: 'iva',
            6: 'costo'
        }
        row = sheet.max_row
        column = sheet.max_column

        for j in range(2, row + 1):
            prod_info = {}
            for i in range(1, column + 1):
                cell_obj = sheet.cell(row=j, column=i)
                column_key = map.get(i)
                if column_key:
                    prod_info[column_key] = cell_obj.value
            products.append(prod_info)

        return jsonify(products)

    return jsonify({'error': 'No se ha recibido ningún archivo'})

@app.route('/update_file', methods = ['POST'])
def update_file():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No json data provided"}), 400

        # Create Excel workbook
        workbook = Workbook()
        sheet = workbook.active

        # Write data into excel
        id_columnas = list(data[0].keys())

        sheet.append(id_columnas)
        for item in data:
            row_data = []
            for key in id_columnas:
                row_data.append(item[key])
            sheet.append(row_data)

        excel_file = 'excel_actualizado.xlsx'
        workbook.save(excel_file)

        return send_file(excel_file, as_attachment=True)
    

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)


