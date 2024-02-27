import { marked } from "marked";
import DOMPurify from "dompurify";

export class DescriptionParser {
  private static readonly DEFAULT_PREVIEW_CHAR_LIMIT = 40;

  public static parse(mdContent: string, previewCharLimit?: number, removeIlluminaLinks = false) {
    const fullHtmlElement = this.buildHtmlElement(mdContent);
    let [ previewHtmlElement, expandedHtmlElement ] = this.splitContent(
      fullHtmlElement, (previewCharLimit || this.DEFAULT_PREVIEW_CHAR_LIMIT)
    );
    if (removeIlluminaLinks) {
      [ previewHtmlElement, expandedHtmlElement ] = this.removeNonIlluminaLinks(previewHtmlElement, expandedHtmlElement);
    }
    const previewHtmlString = DOMPurify.sanitize(previewHtmlElement);
    const expandedHtmlString = DOMPurify.sanitize(expandedHtmlElement || "");
    return [ previewHtmlString, expandedHtmlString ];
  }

  // public static parsePlainText(content: string, previewCharLimit?: number): IParsedDescription {
  //   if (content.length <= previewCharLimit) {
  //     return { preview: content };
  //   } else {
  //     const preview = content.substr(0, previewCharLimit || this.DEFAULT_PREVIEW_CHAR_LIMIT);
  //     return { preview, full: content };
  //   }
  // }

  private static buildHtmlElement(mdContent: string): HTMLElement {
    const container = document.createElement('div');
    const fullHtmlContent = DOMPurify.sanitize(marked.parse(mdContent) as string);
    container.innerHTML = fullHtmlContent;
    return container;
  }

  private static splitContent(el: HTMLElement, previewCharLimit: number): [HTMLElement, HTMLElement | null] {
    let previewHtmlElement: HTMLElement;
    let expandedHtmlElement: HTMLElement | null = null;

    if (this.needExpandedContent(el, previewCharLimit)) {
      previewHtmlElement = this.cutContent(el, previewCharLimit);
      expandedHtmlElement = el;
    } else {
      previewHtmlElement = el;
    }
    return [ previewHtmlElement, expandedHtmlElement ];
  }

  private static needExpandedContent(el: HTMLElement, previewCharLimit: number): boolean {
    // `textContent` returns content as in markup while `innerText` returns as rendered
    return el.innerText.trim().length > previewCharLimit;
  }

  private static cutContent(template: HTMLElement, maxChars: number) {
    // BFS the DOM element
    let truncatedHtml = "";
    let currentLength = 0;

    function traverseNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const remainingLength = maxChars - currentLength;
        const textContent = node.textContent;

        if (textContent === null) {
          // Do nothing
        } else if (textContent.length <= remainingLength) {
          truncatedHtml += textContent;
          currentLength += textContent.length;
        } else {
          truncatedHtml += textContent.substring(0, remainingLength);
          currentLength = maxChars;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'A') {
          // Handle link element
          const linkText = node.textContent;
          const remainingLength = maxChars - currentLength;

          if (linkText === null) {
            truncatedHtml += node.outerHTML;
          } else if (linkText.length <= remainingLength) {
            truncatedHtml += node.outerHTML;
            currentLength += linkText.length;
          } else {
            const copiedNode = node.cloneNode(true);
            copiedNode.innerText = linkText.substring(0, remainingLength);
            truncatedHtml += copiedNode.outerHTML;
            currentLength = maxChars;
          }
        } else {
          // Continue traversing for other elements
          if (currentLength >= maxChars) {
            return
          } else {
            truncatedHtml += `<${node.tagName.toLowerCase()}>`;
            for (const childNode of node.childNodes) {
              if (currentLength >= maxChars) {
                break;
              }
              traverseNode(childNode);
            }
            truncatedHtml += `</${node.tagName.toLowerCase()}>`;
          }
        }
      }
    }

    traverseNode(template);

    const wrapper = document.createElement('fragment');
    wrapper.innerHTML = truncatedHtml;
    const truncatedElement = wrapper.firstChild;
    if (truncatedElement === null) {
      console.warn("Unexpected data: trimmed HTML element is empty.");
    }
    return truncatedElement as HTMLElement;
  }

  private static removeNonIlluminaLinks(previewHtmlElement: HTMLElement, expandedHtmlElement: HTMLElement | null): [HTMLElement, HTMLElement | null] {
    const ILMN_REGEX = /https?:\/\/[\w\-\.]*\.illumina\.com.*/;

    const newPreviewHtmlElement = previewHtmlElement.cloneNode(true) as HTMLElement;
    const newExpandedHtmlElement = expandedHtmlElement?.cloneNode(true) as HTMLElement || null;

    function replaceLinks(node: HTMLElement | null) {
      if (node === null || node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const linkElements = node.querySelectorAll('a');
      linkElements.forEach(linkElement => {
        if (!linkElement.href.match(ILMN_REGEX)) {
          const textNode = document.createTextNode(linkElement.innerText);
          linkElement.replaceWith(textNode);
        }
      });

      node.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          replaceLinks(child as HTMLElement);
        }
      });
    }

    replaceLinks(newPreviewHtmlElement);
    replaceLinks(newExpandedHtmlElement);
    return [ newPreviewHtmlElement, newExpandedHtmlElement ];
  }
}
