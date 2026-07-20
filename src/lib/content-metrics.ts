export function articleWordCount(text: string): number {
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function articleHanCharacterCount(text: string): number {
  return text.match(/\p{Script=Han}/gu)?.length ?? 0;
}
