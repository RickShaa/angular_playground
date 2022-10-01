export function print(text: string = '', data: any = null) {
  if (data) {
    console.log(data);
  } else if (data && text.length > 0) {
    console.log(text, data);
  } else {
    console.log(text);
  }
}
