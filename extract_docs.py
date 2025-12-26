import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text_from_docx(file_path):
    if not os.path.exists(file_path):
        return f"File not found: {file_path}"
    
    try:
        with zipfile.ZipFile(file_path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # w:t tags contain the text
            # The namespace for WordML is http://schemas.openxmlformats.org/wordprocessingml/2006/main
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            texts = []
            for t in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                texts.append(t.text)
            
            return "".join(texts)
    except Exception as e:
        return f"Error processing {file_path}: {str(e)}"

files = [
    'DOcument for portal of Rajasthan portal for geound Water.docx',
    'portal for rajasthan ground water final.docx'
]

for f in files:
    text = extract_text_from_docx(f)
    txt_filename = f.replace('.docx', '.txt')
    with open(txt_filename, 'w', encoding='utf-8') as out:
        out.write(text)
    print(f"Extracted text from {f} to {txt_filename}")
