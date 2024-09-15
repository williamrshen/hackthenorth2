from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the model and vectorizer
model = joblib.load('gender_predictor_model.pkl')
vectorizer = joblib.load('gender_vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    name = data['name']
    
    # Preprocess and predict
    features = vectorizer.transform([name])
    prediction = model.predict(features)
    
    return jsonify({'gender': prediction[0]})

if __name__ == '__main__':
    app.run(port=5001)
