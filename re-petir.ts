import {IBid, objProp1, objProp2, onNewList, markOwnership} from 'ib-id/i-bid.js';
import {xc, PropAction, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {TemplateInstance} from '@github/template-parts/lib/index.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';

export class RePetir extends IBid{
    static is = 're-petir';
    templateMapIds: {[key: string] : string} | undefined;
    templateMapElements: {[key: string]: HTMLTemplateElement} | undefined;
    templateInstances = new WeakMap<Element, TemplateInstance>();
    updateLightChildren(element: Element, item: any, idx: number){
        if(!this.templateInstances.has(element)){
            const template = this.templateMapElements![element.localName];
            if(template === undefined) return;
            const tpl = new TemplateInstance(template, item);
            this.templateInstances.set(element, tpl);
            element.appendChild(tpl);
        }else{
            const tpl = this.templateInstances.get(element);
            tpl!.update(item);
        }
    }
}

const templatesManaged = ({templateMapIds: templateRefs, self}: RePetir) => {
    const templateIds = typeof templateRefs === 'string' ? [templateRefs!] : templateRefs!;
    const templateInstances: {[key: string]: HTMLTemplateElement} = {};
    for(const key in templateRefs){
        const templateId = templateRefs[key];
        const referencedTemplate = upShadowSearch(self, templateId) as HTMLTemplateElement;
        if(referencedTemplate === null){
            throw `Template with id ${templateId} not found.`;
        }
        templateInstances[key] = referencedTemplate;
    }
    self.templateMapElements = templateInstances;
};

const linkInitialized = ({initCount, templateMapElements: templateRefs, self}: RePetir) => {
    if(initCount !== 0){
        markOwnership(self, initCount!);
    }else{
        self.initialized = true;
    }
}

const propActions = [
    templatesManaged,
    linkInitialized,
    onNewList,
] as PropAction[];

const propDefMap: PropDefMap<RePetir> = {
    templateMapIds: objProp2,
    templateMapElements: objProp1
}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(RePetir, slicedPropDefs, 'onPropChange');
xc.define(RePetir);