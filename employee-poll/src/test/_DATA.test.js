import { _saveQuestion, _saveQuestionAnswer } from "../_DATA";

describe("_saveQuestion", () => {
  it("Return an object if save question success", async () => {
    var data = {
      optionOneText: "choose A",
      optionTwoText: "choose B",
      author: "sarahedo",
    };
    var result = await _saveQuestion(data);
    expect(typeof result).toEqual("object");
  });

  it("Throw error if parameters is invalid", async () => {
    var data = {
      optionOneText: "choose A",
      optionTwoText: "choose B",
    };
    var result = await _saveQuestion(data).catch((e) => e);
    expect(result).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("Return true", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });

  it("Throw error if parameters is invalid", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: undefined,
      answer: "optionOne",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
