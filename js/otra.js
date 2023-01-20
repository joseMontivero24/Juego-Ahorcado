//Initial References
Const LetterContainer = Document.GetElementById("Letter-Container");
Const OptionsContainer = Document.GetElementById("Options-Container");
Const UserInputSection = Document.GetElementById("User-Input-Section");
Const NewGameContainer = Document.GetElementById("New-Game-Container");
Const NewGameButton = Document.GetElementById("New-Game-Button");
Const Canvas = Document.GetElementById("Canvas");
Const ResultText = Document.GetElementById("Result-Text");

//Options Values For Buttons
Let Options = {
    Fruits: [
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Pomegranate",
        "Watermelon",
    ],
    Animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
    Countries: [
        "India",
        "Hungary",
        "Kyrgyzstan",
        "Switzerland",
        "Zimbabwe",
        "Dominica",
    ],
};

//Count
Let WinCount = 0;
Let Count = 0;

Let ChosenWord = "";

//Display Option Buttons
Const DisplayOptions = () => {
    OptionsContainer.InnerHTML += `<H3>Please Select An Option</H3>`;
  Let ButtonCon = Document.CreateElement("Div");
    For(Let Value In Options) {
        ButtonCon.InnerHTML += `<Button Class="Options" Onclick="GenerateWord('${Value}')">${Value}</Button>`;
    }
    OptionsContainer.AppendChild(ButtonCon);
};

//Block All The Buttons
Const Blocker = () => {
  Let OptionsButtons = Document.QuerySelectorAll(".Options");
  Let LetterButtons = Document.QuerySelectorAll(".Letters");
    //Disable All Options
    OptionsButtons.ForEach((Button) => {
        Button.Disabled = True;
    });

    //Disable All Letters
    LetterButtons.ForEach((Button) => {
        Button.Disabled.True;
    });
    NewGameContainer.ClassList.Remove("Hide");
};

//Word Generator
Const GenerateWord = (OptionValue) => {
  Let OptionsButtons = Document.QuerySelectorAll(".Options");
    //If OptionValur Matches The Button InnerText Then Highlight The Button
    OptionsButtons.ForEach((Button) => {
        If(Button.InnerText.ToLowerCase() === OptionValue) {
            Button.ClassList.Add("Active");
        }
        Button.Disabled = True;
    });

    //Initially Hide Letters, Clear Previous Word
    LetterContainer.ClassList.Remove("Hide");
    UserInputSection.InnerText = "";

  Let OptionArray = Options[OptionValue];
    //Choose Random Word
    ChosenWord = OptionArray[Math.Floor(Math.Random() * OptionArray.Length)];
    ChosenWord = ChosenWord.ToUpperCase();

  //Replace Every Letter With Span Containing Dash
  Let DisplayItem = ChosenWord.Replace(/./G, '<Span Class="Dashes">_</Span>');

    //Display Each Element As Span
    UserInputSection.InnerHTML = DisplayItem;
};

//Initial Function (Called When Page Loads/User Presses New Game)
Const Initializer = () => {
    WinCount = 0;
    Count = 0;

    //Initially Erase All Content And Hide Letteres And New Game Button
    UserInputSection.InnerHTML = "";
    OptionsContainer.InnerHTML = "";
    LetterContainer.ClassList.Add("Hide");
    NewGameContainer.ClassList.Add("Hide");
    LetterContainer.InnerHTML = "";

    //For Creating Letter Buttons
    For(Let I = 65; I < 91; I++) {
    Let Button = Document.CreateElement("Button");
        Button.ClassList.Add("Letters");
        //Number To ASCII[A-Z]
        Button.InnerText = String.FromCharCode(I);
        //Character Button Click
        Button.AddEventListener("Click", () => {
      Let CharArray = ChosenWord.Split("");
      Let Dashes = Document.GetElementsByClassName("Dashes");
            //If Array Contains Clciked Value Replace The Matched Dash With Letter Else Dram On Canvas
            If(CharArray.Includes(Button.InnerText)) {
                CharArray.ForEach((Char, Index) => {
                    //If Character In Array Is Same As Clicked Button
                    If(Char === Button.InnerText) {
                        //Replace Dash With Letter
                        Dashes[Index].InnerText = Char;
                        //Increment Counter
                        WinCount += 1;
                        //If WinCount Equals Word Lenfth
                        If(WinCount == CharArray.Length) {
                            ResultText.InnerHTML = `<H2 Class='Win-Msg'>You Win!!</H2><P>The Word Was <Span>${ChosenWord}</Span></P>`;
                            //Block All Buttons
                            Blocker();
                        }
                    }
                });
            } Else {
                //Lose Count
                Count += 1;
                //For Drawing Man
                DrawMan(Count);
                //Count==6 Because Head,Body,Left Arm, Right Arm,Left Leg,Right Leg
                If(Count == 6) {
                    ResultText.InnerHTML = `<H2 Class='Lose-Msg'>You Lose!!</H2><P>The Word Was <Span>${ChosenWord}</Span></P>`;
                    Blocker();
                }
            }
            //Disable Clicked Button
            Button.Disabled = True;
        });
        LetterContainer.Append(Button);
    }

    DisplayOptions();
  //Call To CanvasCreator (For Clearing Previous Canvas And Creating Initial Canvas)
  Let { InitialDrawing } = CanvasCreator();
    //InitialDrawing Would Draw The Frame
    InitialDrawing();
};

//Canvas
Const CanvasCreator = () => {
  Let Context = Canvas.GetContext("2d");
    Context.BeginPath();
    Context.StrokeStyle = "#000";
    Context.LineWidth = 2;

  //For Drawing Lines
  Const DrawLine = (FromX, FromY, ToX, ToY) => {
        Context.MoveTo(FromX, FromY);
        Context.LineTo(ToX, ToY);
        Context.Stroke();
    };

  Const Head = () => {
        Context.BeginPath();
        Context.Arc(70, 30, 10, 0, Math.PI * 2, True);
        Context.Stroke();
    };

  Const Body = () => {
        DrawLine(70, 40, 70, 80);
    };

  Const LeftArm = () => {
        DrawLine(70, 50, 50, 70);
    };

  Const RightArm = () => {
        DrawLine(70, 50, 90, 70);
    };

  Const LeftLeg = () => {
        DrawLine(70, 80, 50, 110);
    };

  Const RightLeg = () => {
        DrawLine(70, 80, 90, 110);
    };

  //Initial Frame
  Const InitialDrawing = () => {
        //Clear Canvas
        Context.ClearRect(0, 0, Context.Canvas.Width, Context.Canvas.Height);
        //Bottom Line
        DrawLine(10, 130, 130, 130);
        //Left Line
        DrawLine(10, 10, 10, 131);
        //Top Line
        DrawLine(10, 10, 70, 10);
        //Small Top Line
        DrawLine(70, 10, 70, 20);
    };

  Return { InitialDrawing, Head, Body, LeftArm, RightArm, LeftLeg, RightLeg };
};

//Draw The Man
Const DrawMan = (Count) => {
  Let { Head, Body, LeftArm, RightArm, LeftLeg, RightLeg } = CanvasCreator();
    Switch(Count) {
    Case 1:
        Head();
        Break;
    Case 2:
        Body();
        Break;
    Case 3:
        LeftArm();
        Break;
    Case 4:
        RightArm();
        Break;
    Case 5:
        LeftLeg();
        Break;
    Case 6:
        RightLeg();
        Break;
        Default:
        Break;
    }
};

//New Game
NewGameButton.AddEventListener("Click", Initializer);
Window.Onload = Initializer;