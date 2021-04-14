class QA{
    
    constructor(difficulty, p) {
      this.p5 = p;
      this.numquestions = 5;
      this.questionList=[
      "Which of the following languages is used as a scripting language in the Unity 3D game engine?",
      "What is the largest organ in the human body?",
      "What geometric shape is generally used for stop signs? ",
      "What do the letters of the fast food chain KFC stand for? ",
      "What is the closest planet to our solar system's sun?",
      "What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo? ",
      "Which mathematician refused the Fields Medal?",
      "How many colors are there in a rainbow?",
      "Earth is located in which galaxy?",
      "Who discovered Penicillin?"
      ]

      this.optionList = [
        "A. Java B. C# C. C++ D. Objective-C",
        "A. Skin B. Heart C. Large Intestine D. Liver",
        "A. Hexagon B. Circle C. Octagon D. Triangle",
        "A. Kiwi Food Cut B. Kibbled Freaky Cow C. Kentucky Fried Chicken D. Kentucky Fresh Cheese",
        "A. Mars B. Mercury C. Jupiter D. Earth",
        "A. Tiger B. Panda C. Gorilla D. Crocodile",
        "A. Andrew Wiles B. Terence Tao C. Edward Witten D. Grigori Perelman",
        "A. 7 B. 8 C. 9 D. 10",
        "A. The Milky Way Galaxy B. The Mars Galaxy C. The Galaxy Note D. The Black Hole",
        "A. Marie Curie B. Louis Pasteur C. Alfred Nobel D. Alexander Fleming"
    ]
      this.answerList = ["B","A","C","C","B","C","D","A","A","D"]
      this.questionLeft= [0,1,2,3,4,5,6,7,8,9]


      this.currentQuestion =  this.p5.random(this.questionLeft);    ;
      this.questionLeft.splice(this.currentQuestion,1);
      this.numquestions-=1;
    }

    checkAnswer(letter) {
        return letter === this.answerList[this.currentQuestion];
    } 

    noQuestions(){
      return this.numquestions === 0;
    }

    newQuestion(){
        this.numquestions-=1;
        this.questionLeft.splice(this.currentQuestion,1);
        this.currentQuestion = this.p5.random(this.questionLeft);
        
    }

    display(width, height){
       this.p5.textSize(15);
       this.p5.fill(0);
       this.p5.text(this.questionList[this.currentQuestion], 0, height/4);
       this.p5.text(this.optionList[this.currentQuestion], 0, height/4 + 50);
    }
  }
  
  export default QA;