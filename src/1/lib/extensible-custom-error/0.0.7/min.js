/**
 * Minified by jsDelivr using Terser v5.10.0.
 * Original file: /npm/extensible-custom-error@0.0.7/src/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";class ExtensibleCustomError extends Error{constructor(r,...t){let s;r instanceof Error?s=r:t[0]instanceof Error&&(s=t[0],t.shift()),super(r,...t),Object.defineProperty(this,"name",{configurable:!0,enumerable:!1,value:this.constructor.name,writable:!0});const e=(r,t)=>{if(!t)return r;const s=r.split("\n"),e=t.split("\n"),n=[];return s.forEach((r=>{e.includes(r)||n.push(r)})),[...n,...e].join("\n")},n=s?s.stack:void 0;if(Error.hasOwnProperty("captureStackTrace"))return Error.captureStackTrace(this,this.constructor),void(this.stack=e(this.stack,n));const o=new Error(r).stack.split("\n"),c=[o[0],...o.slice(3)].join("\n");this.stack=e(c,n)}}/*module.exports=ExtensibleCustomError;*/
//# sourceMappingURL=/sm/9b74ac12c4e0b28858f14ec4d7113e9a74fd289effd81444d1dc804f2ef2a83d.map
