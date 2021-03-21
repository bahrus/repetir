import { IBid, objProp1, objProp2, onNewList, markOwnership } from 'ib-id/i-bid.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
import { TemplateInstance } from '@github/template-parts/lib/index.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
export class RePetir extends IBid {
    constructor() {
        super(...arguments);
        this.propActions = propActions;
        this.templateInstances = new WeakMap();
    }
    updateLightChildren(element, item, idx) {
        if (!this.templateInstances.has(element)) {
            const template = this.templateMapElements[element.localName];
            if (template === undefined)
                return;
            const tpl = new TemplateInstance(template, item);
            this.templateInstances.set(element, tpl);
            element.appendChild(tpl);
        }
        else {
            const tpl = this.templateInstances.get(element);
            tpl.update(item);
        }
    }
    connectedCallback() {
        xc.hydrate(this, slicedPropDefs);
        super.connectedCallback();
    }
}
RePetir.is = 're-petir';
const templatesManaged = ({ templateMapIds, self }) => {
    const templateInstances = {};
    for (const key in templateMapIds) {
        const templateId = templateMapIds[key];
        const referencedTemplate = upShadowSearch(self, templateId);
        if (referencedTemplate === null) {
            throw `Template with id ${templateId} not found.`;
        }
        templateInstances[key] = referencedTemplate;
    }
    self.templateMapElements = templateInstances;
};
const linkInitialized = ({ initCount, templateMapElements: templateRefs, self }) => {
    if (initCount !== 0) {
        markOwnership(self, initCount);
    }
    else {
        self.initialized = true;
    }
};
const propActions = [
    templatesManaged,
    linkInitialized,
    onNewList,
];
const propDefMap = {
    templateMapIds: objProp2,
    templateMapElements: objProp1
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(RePetir, slicedPropDefs, 'onPropChange');
xc.define(RePetir);
