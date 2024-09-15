import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn import metrics

import joblib



print("hello world")
# Load the dataset
df = pd.read_csv('names_gender_dataset.csv')

# Preprocess the data
X = df['name']
y = df['gender']

# Convert names to features (using a simple CountVectorizer for this example)
vectorizer = CountVectorizer(analyzer='char', ngram_range=(1, 2))  # Use character-level n-grams
X_features = vectorizer.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_features, y, test_size=0.2, random_state=42)

# Train a classifier
model = MultinomialNB()
model.fit(X_train, y_train)

# Make predictions and evaluate the model
y_pred = model.predict(X_test)
print("Accuracy:", metrics.accuracy_score(y_test, y_pred))

# Save the model and vectorizer
joblib.dump(model, 'gender_predictor_model.pkl')
joblib.dump(vectorizer, 'gender_vectorizer.pkl')
