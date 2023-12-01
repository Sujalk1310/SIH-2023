def preprocess_text(nltk, text, lemmatizer, stop_words):
    # Tokenize the text
    words = nltk.word_tokenize(text.lower())
    # Remove stopwords and lemmatize words
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    # Rejoin the words into a cleaned text
    cleaned_text = ' '.join(words)
    return cleaned_text

def nlp_dept_detection(nltk, summary, stop_words, lemmatizer, loaded_classifier, loaded_vectorizer):
    new_summary_cleaned = preprocess_text(nltk, summary, lemmatizer, stop_words)
    new_summary_tfidf = loaded_vectorizer.transform([new_summary_cleaned])
    probabilities = loaded_classifier.predict_proba(new_summary_tfidf)[0]
    max_prob = max(probabilities)
    if max_prob >= 0.1:
        predicted_class = loaded_classifier.classes_[list(probabilities).index(max_prob)]
        return predicted_class
    else :
        return False