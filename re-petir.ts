import {IBid} from 'ib-id/i-bid.js';
import {xc} from 'xtal-element/lib/XtalCore.js';
import {TemplateInstance} from '@github/template-parts/lib/index.js';
export class RePetir extends IBid{
    static is = 're-petir';
    templateMap: string | {[key: string]: string} | undefined;
}
xc.define(RePetir);