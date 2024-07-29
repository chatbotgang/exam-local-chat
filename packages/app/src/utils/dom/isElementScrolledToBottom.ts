export default function isElementScrolledToBottom(element: HTMLElement) {
  return element.scrollHeight - element.scrollTop === element.clientHeight;
}
