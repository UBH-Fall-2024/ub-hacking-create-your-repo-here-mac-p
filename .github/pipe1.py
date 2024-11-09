from transformers import pipeline

def main():
    print("hello world")

    classifier = pipeline("sentiment-analysis")

    res = classifier("This is a test prompt")

    print(res)

if __name__ == "__main__":
    main()
