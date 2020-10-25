import { getFirstParagraph } from 'pages/QuestionRoaster/subComponents/QuestionView.js';

it('should extract first paragraph from html response of rich media text', () => {
  let html =
    '<p>hi there ftom anywhere</p> <p>hi there ftom anywhere</p> <h1>Qds</h1> <p>hi there ftom anywhere</p>';
  let result = getFirstParagraph(html);
  expect(result).toEqual('hi there ftom anywhere');
});

it('should return text from function', () => {
  let html = 'hi there ftom anywhere HFHGSKGJDJVHSL KJFHVHJLDVLJSHLJVHSLHV';
  let result = getFirstParagraph(html);
  expect(result).toEqual('No Content');
});

it('should return text from formatted paragraph', () => {
  const innerText = 'inner text';
  let html = `<p style={'color: red; font-weight: boold'}>${innerText}</p>`;
  let result = getFirstParagraph(html);
  expect(result).toEqual(innerText);
});
