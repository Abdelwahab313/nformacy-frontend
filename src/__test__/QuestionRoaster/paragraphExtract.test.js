import {getFirstParaghraph} from '../../pages/QuestionRoaster/QuestionView.js'


it('should extract first paragraph from html response of rich media text', () => {
    let html = "<p>hi there ftom anywhere</p> <p>hi there ftom anywhere</p> <h1>Qds</h1> <p>hi there ftom anywhere</p>";
    let result  = getFirstParaghraph(html);
    expect(result).toEqual("hi there ftom anywhere")
})

it('should return text from function', () => {
    let html = "hi there ftom anywhere HFHGSKGJDJVHSL KJFHVHJLDVLJSHLJVHSLHV";
    let result  = getFirstParaghraph(html);
    expect(result).toEqual('No Content')
})