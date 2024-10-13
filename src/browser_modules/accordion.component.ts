class CustomHTMLAccordionElement extends HTMLDivElement {
  private readonly templateId = 'custom-element--accordion';
  private readonly cssPath = '/styles/accordion.css';
  private readonly template = `
<template id="template-accordion">
  <div class="accordion">
    <input type="checkbox" hidden id="accordion-12345" />
    <header>
      <label for="accordion-12345">
        <slot name="accordion-title"></slot>
        <span id="accordion-content">Title</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-down</title>
          <path
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </label>
    </header>

    <section>
      <p id="accordion-content">
        <slot name="accordion-content"></slot>
      </p>
    </section>
  </div>
</template>
`;

  constructor() {
    super();
    this.generateElement(this.setupTemplate());
  }

  protected setupTemplate() {
    let cssLink = document
      .getElementsByTagName('head')[0]
      .querySelector(`link[href=${this.cssPath}]`);

    if (!cssLink) {
      cssLink = document.createElement('link');
      document.querySelector('head')!.appendChild(cssLink);
    }

    let templateElem = document.querySelector(
      `template#${this.templateId}`
    ) as HTMLTemplateElement | null;

    if (!templateElem) {
      templateElem = document.createElement('template') as HTMLTemplateElement;
      templateElem.innerHTML = this.template;
      templateElem.id = this.templateId;
      document.appendChild(templateElem);
    }

    return templateElem;
  }

  protected generateElement(template: HTMLTemplateElement) {
    const thisHtml = template.content.cloneNode(true) as HTMLElement;

    this.innerHTML = '';
    this.appendChild(thisHtml);
  }
}

customElements.define('custom-accordion', CustomHTMLAccordionElement);
