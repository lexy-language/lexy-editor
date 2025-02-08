"use strict";(self.webpackChunkclient_app=self.webpackChunkclient_app||[]).push([[2809],{42809:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Fn});var r=t(65043),i=t(61596),l=t(8142),s=t(34535),o=t(11906),a=t(44951),c=t(39580),u=t(35721),d=t(30681),x=t(38968),m=t(2050),f=t(48734),g=t(42692),h=t(692),p=t(28400),j=t(14571),A=t(81637),y=t(7353),v=t(74542),b=t(70579);const N=(0,s.Ay)(x.A)`
  padding: 0;
`,C=(0,s.Ay)(m.A)`
  padding: 0;
  min-width: 30px
`;function S(e){const{folder:n,currentFile:t,indent:r,setCurrentFile:i,parent:l}=e,s=[...l,n.name],{projectFilesTreeState:o,setProjectFilesTreeState:a}=(0,c.NT)(),u=o.isOpen(s);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.Ay,{disablePadding:!0,children:(0,b.jsxs)(N,{style:r>0?{marginLeft:16*r+"px"}:{},children:[(0,b.jsx)(C,{onClick:()=>{return e=!u,a(o.setOpen(s,e));var e},children:u?(0,b.jsx)(h.A,{fontSize:"small"}):(0,b.jsx)(g.A,{fontSize:"small"})}),(0,b.jsx)(C,{children:(0,b.jsx)(p.A,{fontSize:"small"})}),(0,b.jsx)(f.A,{primary:n.name})]})}),u&&n.folders?n.folders.map((e=>(0,b.jsx)(S,{folder:e,indent:r+1,currentFile:t,setCurrentFile:i,parent:s},e.name))):[],u&&n.files?n.files.map((e=>(0,b.jsx)(F,{file:e,indent:r+1,currentFile:t,setCurrentFile:i},e.name))):[]]})}function F(e){const{file:n,currentFile:t,indent:r,setCurrentFile:i}=e;return(0,b.jsx)(d.Ay,{disablePadding:!0,onClick:()=>i(n),style:t===n?{background:"#EEE"}:{},children:(0,b.jsxs)(N,{style:r>0?{paddingLeft:30+16*r+"px"}:{},children:[(0,b.jsx)(C,{children:(0,b.jsx)(j.A,{fontSize:"small"})}),(0,b.jsx)(f.A,{primary:n.name})]})})}const P=function(){const{projectFiles:e,currentFile:n,setCurrentFile:t}=(0,c.NT)();return(0,b.jsx)(u.A,{disablePadding:!0,children:null===e?(0,b.jsx)(y.A,{children:"No project loaded."}):(0,v.VP)(e)?(0,b.jsx)(A.A,{}):(0,b.jsx)(S,{folder:e,indent:0,currentFile:n,setCurrentFile:t,parent:[]})})};var T=t(42577),w=t(85225),E=t(25770),z=t(39681),L=t(18124),V=t(54175),k=t(7967),M=t(17548),O=t(99462),D=t(79574),B=t(50307),J=t(97585),R=t(15459),W=t(10673),I=t(14865),$=t(84593);const U=(0,s.Ay)(x.A)`
  padding: 0;
`,G=(0,s.Ay)(m.A)`
  padding: 0;
  min-width: 30px
`;function _(e){function n(e){a({lineNumber:i.reference.lineNumber,column:i.reference.characterNumber,source:"state"}),j(i),"contextmenu"===e.type&&(v(e.currentTarget),e.preventDefault())}function t(){v(null)}const{node:i,indent:l,parent:s}=e,o=[...s,i.name],{setEditorPosition:a,structureTreeState:u,setStructureTreeState:x,currentStructureNode:p,setCurrentStructureNode:j}=(0,c.NT)(),A=u.isOpen(o),[y,v]=r.useState(null),N=Boolean(y),C=i.nodeType!==R.NodeType.Function?[]:[(0,b.jsxs)(W.A,{onClick:()=>{t()},children:[(0,b.jsx)(m.A,{children:(0,b.jsx)($.A,{fontSize:"small"})}),(0,b.jsx)(f.A,{children:"Execute"})]},"execute")],S=function(){const e=[];if(A&&i.children)for(let n=0;n<i.children.length;n++){const t=i.children[n];t&&e.push((0,b.jsx)(_,{node:t,indent:l+1,parent:o},t.name))}return e}();return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.Ay,{disablePadding:!0,onClick:n,onContextMenu:n,style:p===i?{background:"#EEE"}:{},children:(0,b.jsxs)(U,{onClick:()=>{return e=!A,x(u.setOpen(o,e));var e},style:l>0?{paddingLeft:16*l+"px"}:{},children:[(0,b.jsx)(G,{children:0===i.children.length?(0,b.jsx)(b.Fragment,{}):A?(0,b.jsx)(h.A,{fontSize:"small"}):(0,b.jsx)(g.A,{fontSize:"small"})}),(0,b.jsx)(G,{children:function(e){switch(e){case T.d.Code:case T.d.Function:return(0,b.jsx)(w.A,{fontSize:"small"});case T.d.Scenario:return(0,b.jsx)(E.A,{fontSize:"small"});case T.d.Table:return(0,b.jsx)(z.A,{fontSize:"small"});case T.d.Results:case T.d.Parameters:case T.d.Type:return(0,b.jsx)(L.A,{fontSize:"small"});case T.d.Enum:return(0,b.jsx)(V.A,{fontSize:"small"});case T.d.Date:return(0,b.jsx)(k.A,{fontSize:"small"});case T.d.Errors:return(0,b.jsx)(M.A,{fontSize:"small"});case T.d.EnumMember:case T.d.Number:return(0,b.jsx)(O.A,{fontSize:"small"});case T.d.Boolean:return(0,b.jsx)(D.A,{});case T.d.String:return(0,b.jsx)(B.A,{fontSize:"small"});case T.d.Unknown:default:return(0,b.jsx)(J.A,{fontSize:"small"})}}(i.kind)}),(0,b.jsx)(f.A,{primary:i.name})]})}),S,(0,b.jsx)(I.A,{anchorEl:y,open:C.length>0&&N,onClose:t,MenuListProps:{"aria-labelledby":"basic-button"},children:C})]})}const q=function(){const{structure:e}=(0,c.NT)();return(0,b.jsx)(u.A,{disablePadding:!0,children:function(){if(null===e)return(0,b.jsx)(y.A,{children:"No structure."});if((0,v.VP)(e))return(0,b.jsx)(A.A,{});const n=[];for(let t=0;t<e.length;t++){const r=e[t];null!==r&&n.push((0,b.jsx)(_,{node:r,indent:0,parent:[]},t))}return n}()})};var H=t(77158),K=(t(83347),t(62940));const Q=" ".charCodeAt(0);function X(){const e=(0,H.dJ)(),n=(0,r.useRef)(null),{currentFileCode:t,setCurrentFileCode:i,setCurrentProject:l,currentFileLogging:s,editorPosition:o,setEditorPosition:a}=(0,c.NT)(),[u,d]=(0,r.useState)(!1);function x(){var r;if(!n.current)return;if(null===s||(0,v.VP)(s)||null===e)return;if(null===t||(0,v.VP)(t))return;const i=null===(r=n.current)||void 0===r?void 0:r.getModel();if(null===i)return;const l=(0,K.where)(s,(e=>e.isError&&t.name===e.reference.file.fileName)).map((n=>{const t=n.reference.lineNumber>0&&n.reference.lineNumber<=i.getLineCount()?i.getLineContent(n.reference.lineNumber):null,r=t?function(e,n){for(let t=n+1;t<e.length;t++)if(e.charCodeAt(t)===Q)return t;return e.length}(t,n.reference.characterNumber):1;return{message:n.message,severity:e.MarkerSeverity.Error,startLineNumber:n.reference.lineNumber,startColumn:n.reference.characterNumber,endLineNumber:n.reference.lineNumber,endColumn:r+1}}));e.editor.setModelMarkers(i,"owner",l)}if((0,r.useEffect)((function(){e&&e.languages.register({id:"lexy"})}),[e]),(0,r.useEffect)((function(){var e,t,r;n.current&&null!==o&&"editor"!==o.source&&(null===(e=n.current)||void 0===e||e.setPosition({lineNumber:o.lineNumber,column:o.column}),null===(t=n.current)||void 0===t||t.revealLineInCenter(o.lineNumber),null===(r=n.current)||void 0===r||r.focus())}),[o]),(0,r.useEffect)((function(){var e,r;null===n.current||null===t||(0,v.VP)(t)||"editor"===t.source||(null===(e=n.current)||void 0===e||e.setValue(t.code),null===(r=n.current)||void 0===r||r.revealLine(1))}),[t]),(0,r.useEffect)(x,[s,e,t]),(0,r.useEffect)((function(){var e,r;n.current&&null!==t&&!(0,v.VP)(t)&&(null===(e=n.current)||void 0===e||e.setValue(t.code),null===(r=n.current)||void 0===r||r.revealLine(1),x())}),[u]),!t)return(0,b.jsx)(y.A,{children:"No file selected"});if((0,v.VP)(t))return(0,b.jsx)(A.A,{});const m=null!==t&&void 0!==t&&t.identifier.endsWith("lexy")?"yaml":void 0;return(0,b.jsx)(H.Ay,{language:m,theme:"lexy-theme",onChange:function(e,n){if(!e)return;if(console.log("handleEditorChange"),!t||(0,v.VP)(t))return;if(t.code===e)return;let r={name:t.name,identifier:t.identifier,code:e,source:"editor"};i(r),l((n=>n.setFile(r.identifier,e)))},onMount:function(e){var t,r;n.current=e,null===(t=n.current)||void 0===t||t.updateOptions({scrollbar:{horizontal:"hidden"}}),d(!0),e.onDidChangeCursorPosition((e=>{a({lineNumber:e.position.lineNumber,column:e.position.column,source:"editor"})}));const i=null===(r=n.current)||void 0===r?void 0:r.getModel();null!==i&&i.updateOptions({tabSize:2,indentSize:2})},options:{scrollbar:{horizontal:"hidden"},minimap:{enabled:!1},wordWrap:"on"}})}var Y=t(69413),Z=t(53193),ee=t(79190),ne=t(69285),te=t(97866),re=t(67784),ie=t(74605),le=t(23217),se=t(27449),oe=t(88310),ae=t(82140),ce=t(84588),ue=t(58390),de=t(36339),xe=t(35284),me=t(31200),fe=t(88714),ge=t(88911),he=t(94496);const pe=(0,s.Ay)("div")`
  width: 16px;
  border-left: 2px solid #BBB;
`,je=(0,s.Ay)("div")`
  padding-top: 24px;
  width: 100%;
`,Ae=(0,s.Ay)("div")`
  width: 100%;
  margin-bottom: 24px;
`,ye=(0,s.Ay)(ge.A)`
  width: 100%;
`;function ve(e){const{name:n,title:t=!1,children:r}=e;return(0,b.jsxs)(Ae,{children:[(0,b.jsx)(he.A,{variant:"subtitle1",fontWeight:t?"bolder":"normal",fontSize:t?"1.3rem":"1rem",children:n}),(0,b.jsxs)(ye,{direction:"row",children:[(0,b.jsx)(pe,{}),(0,b.jsx)(je,{children:r})]})]},n)}var be=t(84508);const Ne=(0,s.Ay)(re.A)`
  width: 100%;
`,Ce=(0,s.Ay)(ne.A)`
  width: 100%;
`,Se=(0,s.Ay)(ce.l)`
  width: 100%;
`,Fe=(0,s.Ay)(y.A)`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;function Pe(e){var n;const{parameter:t,parent:r}=e,{executeFunction:i,setExecuteFunction:l}=(0,c.NT)(),s=r?r.append([t.name]):new be.VariablePath([t.name]);function o(e){return l(i.setParameter(s,e.target.value))}function a(e){l(i.setParameter(s,e))}function u(e){l(i.setParameter(s,e.target.value))}function d(e){l(i.setParameter(s,e.target.checked))}function x(e){l(i.setParameter(s,parseInt(e.target.value)))}function m(){let e=i.getParameter(s);return void 0===e&&(e=""),e}switch(null===(n=t.variableType)||void 0===n?void 0:n.variableTypeName){case oe.VariableTypeName.PrimitiveType:return(0,b.jsx)(Fe,{children:function(){const e=xe.Assert.notNull((0,ae.asPrimitiveType)(t.variableType),"primitiveType");if(e.type===se.TypeNames.string){const e=m();return(0,b.jsx)(Ne,{label:t.name,variant:"outlined",value:e,onChange:u})}if(e.type===se.TypeNames.number){const e=m();return(0,b.jsx)(Ne,{label:t.name,variant:"outlined",type:"number",value:e||"",onChange:x})}if(e.type===se.TypeNames.boolean){const e=m();return(0,b.jsx)(ie.A,{control:(0,b.jsx)(le.A,{value:e,onChange:d}),label:t.name})}if(e.type===se.TypeNames.date){const e=m();return(0,b.jsx)(ue.$,{dateAdapter:de.h,children:(0,b.jsx)(Se,{label:t.name,value:e,onChange:a,format:"yyyy/MM/dd"})})}return(0,b.jsxs)("div",{children:["Unknown primitive type: ",e.type]})}()});case oe.VariableTypeName.EnumType:return(0,b.jsx)(Fe,{children:function(){const e=xe.Assert.notNull((0,me.asEnumType)(t.variableType),"enumType"),n=m();return(0,b.jsxs)(Z.A,{fullWidth:!0,children:[(0,b.jsx)(ee.A,{id:"label-select-"+t.name,children:t.name}),(0,b.jsx)(Ce,{labelId:"label-select-"+t.name,value:n,label:t.name,onChange:o,children:e.enum.members.map(((n,t)=>(0,b.jsx)(W.A,{value:`${e.type}.${n.name}`,children:n.name},t)))})]})}()});case oe.VariableTypeName.CustomType:return function(){const e=xe.Assert.notNull((0,fe.asCustomType)(t.variableType),"enumType");return(0,b.jsx)(ve,{name:t.name,children:(0,b.jsx)(Ee,{variables:e.typeDefinition.variables,parent:s})})}();default:return(0,b.jsxs)("div",{children:["Unknown type: ",t.name]})}}const Te=(0,s.Ay)(ge.A)`
  width: 100%;
`,we=(0,s.Ay)(y.A)`
  margin-bottom: 24px;
`;function Ee(e){const{variables:n,parent:t}=e;if(!n||0===n.length)return(0,b.jsx)(we,{children:"No parameter variables defined"});const r=[];for(let i=0;i<n.length;i++){const e=n[i];r.push((0,b.jsx)(Pe,{parameter:e,parent:t},i))}return(0,b.jsx)(Te,{children:r})}const ze=(0,s.Ay)(ge.A)`
  width: 100%;
`,Le=(0,s.Ay)(y.A)`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`,Ve=(0,s.Ay)(re.A)`
  width: 100%;
`;function ke(e){const{values:n}=e,t=null!==n?Object.keys(n):null;if(null===n||null===t||0===t.length)return(0,b.jsx)(Le,{children:"No result variables defined"});const r=[];function i(e,n){return null===e||function(e){return"number"===typeof e||"string"===typeof e||e instanceof String||e instanceof Date||"[object Boolean]"===toString.call(e)}(e)?(0,b.jsx)(Le,{children:(0,b.jsx)(Ve,{disabled:!0,label:n,variant:"outlined",value:null!==e?e:""})},n):(0,b.jsx)(ve,{name:n,children:(0,b.jsx)(ke,{values:e})},n)}for(const l of t){const e=n[l];r.push(i(e,l))}return(0,b.jsx)(ze,{children:r})}var Me=t(12695),Oe=t(97461);const De=(0,s.Ay)(y.A)`
  padding: 16px 8px;
`,Be=(0,s.Ay)(y.A)`
  margin-bottom: 24px;
`,Je=(0,s.Ay)(o.A)`
  width: 100%;
  margin-top: 24px;
`,Re=(0,s.Ay)(y.A)`
  margin-top: 2px;
  margin-bottom: 24px;
  font-size: .8rem;
`,We=(0,s.Ay)(y.A)`
  margin-top: 8px;
  margin-bottom: 24px;
  font-size: 1rem;
  color: crimson;
`;const Ie=function(){function e(){if((0,v.VP)(u))return;const e=t,n=d(e);if(null===n)return void s(l.setError(`Couldn't find function: '${null===e||void 0===e?void 0:e.name}'`));const r=new Date;try{const e=Oe.DependencyGraphFactory.nodeAndDependencies(u,n),t=(0,te.Br)(e).getFunction(n),i=l.getParameters(),c=t.run(i),d=Me.BuiltInDateFunctions.milliseconds(new Date,r);a(o.setCurrent(c.logging)),s(l.setResults(c.value,d))}catch(i){s(l.setError(i.toString()))}}const{structure:n,currentStructureNode:t,setCurrentStructureNode:i,executeFunction:l,setExecuteFunction:s,executionLogging:o,setExecutionLogging:a,nodes:u}=(0,c.NT)();if((0,r.useEffect)((()=>{if(null!==n){for(const e of n){if(null!==d(e))return void i(e)}i(null)}}),[n,i]),(0,v.VP)(t))return(0,b.jsx)(A.A,{});function d(e){return null===e?null:e.nodeType===R.NodeType.Function?e.node:e.nodeType===R.NodeType.Scenario?e.node.functionNode:null}const x=t,m=d(t),f=null!==m?m.name.value:"",g=function(){if(null===n)return[];const e=[];return n.forEach((n=>{const t=d(n);if(null!==t){const n=t.name.value;e.push((0,b.jsx)(W.A,{value:n,children:n},n))}})),e}();return null===n||0===g.length?(0,b.jsxs)(y.A,{children:["No functions found in file. Add ",(0,b.jsx)("strong",{children:"Function:"})," to the code, or select a file with functions."]}):(0,b.jsxs)(De,{children:[(0,b.jsx)(Be,{children:(0,b.jsxs)(Z.A,{fullWidth:!0,children:[(0,b.jsx)(ee.A,{id:"label-select-function",children:"Execute Function"}),(0,b.jsx)(ne.A,{labelId:"label-select-function",value:f,label:"Execute Function",onChange:e=>{if(null===n)return;const t=function(e){if(null===n)return null;for(const t of n){const n=d(t);if(null!==n&&n.name.value===e)return t}return null}(e.target.value);null!==t&&i(t)},children:g})]})}),function(){var n;if(null===x||null===m)return(0,b.jsx)(y.A,{children:"Select function to execute it."});const t=l.getResults();return(0,b.jsxs)(Y.A,{children:[(0,b.jsx)(ve,{name:"Parameters",title:!0,children:(0,b.jsx)(Ee,{variables:null===(n=m.parameters)||void 0===n?void 0:n.variables})}),(0,b.jsx)(Je,{variant:"contained",onClick:e,children:"Execute"}),null!==l.elapsed?(0,b.jsxs)(Re,{children:["Execution time: ",l.elapsed,"ms"]}):(0,b.jsx)(b.Fragment,{}),null!==l&&l.error?(0,b.jsx)(We,{children:l.error.split("\n").map(((e,n)=>(0,b.jsx)("div",{children:e},n)))}):[],null!==t?(0,b.jsx)(ve,{name:"Results",title:!0,children:(0,b.jsx)(ke,{values:t})}):(0,b.jsx)(b.Fragment,{})]})}()]})};var $e=t(88446);const Ue=(0,s.Ay)(u.A)`
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 12px;
`,Ge=(0,s.Ay)(x.A)`
  padding: 2px;
  width: 30px;
`,_e=(0,s.Ay)(m.A)`
  padding: 0;
  min-width: 30px
`,qe=(0,s.Ay)("div")`
  flex-grow: 1;
`,He=(0,s.Ay)("div")`
  width: 12px;
`;function Ke(e){const{entry:n}=e,t=n.isError?{color:"red"}:null!==n.node?{color:"green"}:{},{executionLogging:i,setExecutionLogging:l,setEditorPosition:s,setLayout:o,currentFile:x}=(0,c.NT)(),[m,f]=(0,r.useState)(!1);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(d.Ay,{disablePadding:!0,style:t,children:[(0,b.jsx)(Ge,{style:{flexGrow:0},children:(0,b.jsx)(_e,{onClick:()=>f(!m),children:null===n.errors||0===n.errors.length?(0,b.jsx)(b.Fragment,{}):m?(0,b.jsx)(h.A,{fontSize:"small"}):(0,b.jsx)(g.A,{fontSize:"small"})})}),(0,b.jsx)(qe,{children:n.message}),n.executionLogging?(0,b.jsx)($e.A,{style:{cursor:"pointer"},onClick:()=>{n.executionLogging&&(l(i.setCurrent(n.executionLogging)),o((e=>e.setMainContainer(a.J3.ExecutionLogging))))},children:"view execution logging"}):(0,b.jsx)(b.Fragment,{}),(0,b.jsx)(He,{}),n.reference?(0,b.jsx)($e.A,{style:{cursor:"pointer"},onClick:()=>{n.reference&&(null===x||(0,v.VP)(x)||x.name===n.reference.file.fileName)&&(s({lineNumber:n.reference.lineNumber,column:n.reference.characterNumber,source:"state"}),o((e=>e.setMainContainer(a.J3.Source))))},children:"view code"}):(0,b.jsx)(b.Fragment,{})]}),null!==n.errors&&m?(0,b.jsx)(u.A,{children:n.errors.map(((e,n)=>(0,b.jsx)(d.Ay,{disablePadding:!0,children:e},n)))}):(0,b.jsx)(b.Fragment,{})]})}const Qe=function(){const{testingLogging:e}=(0,c.NT)();if((0,v.VP)(e))return(0,b.jsx)(A.A,{});const n=e.map(((e,n)=>(0,b.jsx)(Ke,{entry:e},n)));return(0,b.jsx)(Ue,{disablePadding:!0,children:n})},Xe=(0,s.Ay)(x.A)`
  padding: 2px;
`,Ye=(0,s.Ay)(u.A)`
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 12px;
`;function Ze(e){const{setEditorPosition:n,currentFile:t}=(0,c.NT)(),{logEntry:r}=e;return(0,b.jsx)(d.Ay,{disablePadding:!0,onClick:function(){(null===t||(0,v.VP)(t)||t.name===r.reference.file.fileName)&&n({lineNumber:r.reference.lineNumber,column:r.reference.characterNumber,source:"state"})},children:(0,b.jsx)(Xe,{style:r.isError?{color:"red"}:{},children:r.message})})}const en=function(){const{currentFileLogging:e}=(0,c.NT)();if((0,v.VP)(e))return(0,b.jsx)(A.A,{});const n=e.sort(((e,n)=>e.sortIndex<n.sortIndex?-1:1)).map(((e,n)=>(0,b.jsx)(Ze,{logEntry:e},n)));return(0,b.jsx)(Ye,{disablePadding:!0,children:n})},nn=(0,s.Ay)(l.A)`
  margin-top: 8px;
  margin-bottom: 8px;
`,tn=(0,s.Ay)(y.A)`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`,rn=(0,s.Ay)(re.A)`
  width: 100%;
`;function ln(e){const{values:n}=e,t=n?Object.keys(n):null;if(null===n||null===t||0===t.length)return(0,b.jsx)(tn,{children:"No variables defined"});const r=[];function i(e,n){return!e||function(e){return"number"===typeof e||"string"===typeof e||e instanceof String||e instanceof Date||"[object Boolean]"===toString.call(e)}(e)?(0,b.jsx)(l.A,{size:3,children:(0,b.jsx)(tn,{children:(0,b.jsx)(rn,{disabled:!0,label:n,variant:"outlined",value:null!==e?e:""})},n)}):(0,b.jsx)(l.A,{size:12,children:(0,b.jsx)(ve,{name:n,children:(0,b.jsx)(ln,{values:e})},n)})}for(const l of t){const e=n[l];r.push(i(e,l))}return(0,b.jsx)(nn,{container:!0,spacing:2,children:r})}const sn=(0,s.Ay)(x.A)`
  padding: 0;
`,on=(0,s.Ay)(m.A)`
  padding: 0;
  min-width: 30px
`,an=(0,s.Ay)(ln)`
  margin-bottom: 24px
`,cn=(0,s.Ay)(ge.A)`
  flex-grow: 1;
`,un=(0,s.Ay)(d.Ay)`
  &:not(:last-child) {
  }
`,dn=(0,s.Ay)(d.Ay)`
  color: darkgrey;
`;function xn(e){function n(e){return null!==e&&Object.keys(e).length>0}function t(e){return(0,b.jsx)(d.Ay,{disablePadding:!0,style:i>0?{paddingLeft:e+"px"}:{},children:(0,b.jsxs)(cn,{children:[n(r.readVariables)?(0,b.jsx)(an,{values:r.readVariables}):(0,b.jsx)(b.Fragment,{}),n(r.writeVariables)?(0,b.jsx)(ln,{values:r.writeVariables}):(0,b.jsx)(b.Fragment,{})]})})}const{entry:r,indent:i,parent:l,index:s}=e,o=[...l,s.toString()],a=[...l,s.toString(),"var"],{executionLoggingTreeState:u,setExecutionLoggingTreeState:x}=(0,c.NT)(),m=u.isOpen(o),p=u.isOpen(a),j="Parameters"===r.message||"Results"===r.message,A=n(r.readVariables)||n(r.writeVariables),y=r.entries.length>0||j&&A,v=r.message.startsWith("Execute:"),N=e=>x(u.setOpen(a,e));return j&&!A?(0,b.jsx)(b.Fragment,{}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(un,{disablePadding:!0,style:j?{color:"darkgray"}:{},children:(0,b.jsxs)(sn,{onClick:()=>{return e=!m,x(u.setOpen(o,e));var e},style:i>0?{paddingLeft:16*i+"px"}:{},children:[(0,b.jsx)(on,{children:y?m?(0,b.jsx)(h.A,{fontSize:"small"}):(0,b.jsx)(g.A,{fontSize:"small"}):(0,b.jsx)(b.Fragment,{})}),(0,b.jsx)(f.A,{primaryTypographyProps:v?{fontWeight:600}:{},children:r.message})]})}),function(){if(j)return m?t(16*i+30):(0,b.jsx)(b.Fragment,{});if(!A)return(0,b.jsx)(b.Fragment,{});const e=16*i+60;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(dn,{disablePadding:!0,children:(0,b.jsxs)(sn,{onClick:()=>N(!p),style:i>0?{paddingLeft:16*i+30+"px"}:{},children:[(0,b.jsx)(on,{children:p?(0,b.jsx)(h.A,{fontSize:"small"}):(0,b.jsx)(g.A,{fontSize:"small"})}),"Variables"]})}),p?t(e):(0,b.jsx)(b.Fragment,{})]})}(),function(){const e=[];if(m&&r.entries)for(let n=0;n<r.entries.length;n++){const t=r.entries[n];t&&e.push((0,b.jsx)(xn,{entry:t,indent:i+1,parent:o,index:n},n))}return e}()]})}const mn=function(){const{executionLogging:e,setExecutionLoggingTreeState:n,currentFile:t}=(0,c.NT)();return(0,r.useEffect)((()=>{n((e=>e.reset().setOpen(["0"],!0)))}),[null===t||void 0===t?void 0:t.identifier,n]),(0,b.jsx)(u.A,{disablePadding:!0,children:function(){if(null===e)return(0,b.jsx)(y.A,{children:"No execution logging."});if((0,v.VP)(e))return(0,b.jsx)(A.A,{});const n=[];for(let t=0;t<e.logging.length;t++){const r=e.logging[t];null!==r&&n.push((0,b.jsx)(xn,{entry:r,indent:0,parent:[],index:t},t))}return n}()})};var fn=t(31404),gn=t(29285);const hn=(0,s.Ay)("div")`
  padding: 4px 12px 8px 4px;
`;function pn(){const{currentFileCode:e}=(0,c.NT)();return(0,v.VP)(e)?(0,b.jsx)(A.A,{size:200}):(0,b.jsx)(hn,{children:(0,b.jsx)(fn.o,{className:"markdown-body",remarkPlugins:[gn.A],children:null===e||void 0===e?void 0:e.code})})}const jn=(0,s.Ay)(l.A)`
  height: calc(100% - 264px);
`,An=(0,s.Ay)(l.A)`
  height: 100%;
  padding: 8px;
`,yn=(0,s.Ay)(l.A)`
  height: 200px;
  padding: 0 8px 8px;
`,vn=(0,s.Ay)(i.A)`
  height: 100%;
  padding: 8px;
  overflow-y: auto;
`,bn=(0,s.Ay)(y.A)`
  height: calc(100% - 44px);
  padding: 0;
  overflow-y: auto;
`,Nn=(0,s.Ay)(y.A)`
  height: 44px;
  padding: 8px 0 0;
`;function Cn(e,n,t){return(0,b.jsx)(Nn,{children:e.map((e=>(0,b.jsx)(o.A,{variant:e.value===n?"contained":"text",onClick:()=>t(e.value),children:e.name},e.name)))})}function Sn(e,n){var t;return(0,b.jsx)(bn,{children:null===(t=e.find((e=>e.value===n)))||void 0===t?void 0:t.element()})}const Fn=function(){const{layout:e,setLayout:n,testingLogging:t,currentFileCode:i}=(0,c.NT)(),[l,s]=(0,r.useState)(!1),o=[{name:"Explorer",value:a.RN.Explorer,element:()=>(0,b.jsx)(P,{})},{name:"Structure",value:a.RN.Structure,element:()=>(0,b.jsx)(q,{})}],u=[{name:"View",value:a.J3.View,element:()=>(0,b.jsx)(pn,{})},{name:"Source Code",value:a.J3.Source,element:()=>(0,b.jsx)(X,{})},{name:"Execution Logging",value:a.J3.ExecutionLogging,element:()=>(0,b.jsx)(mn,{})}],d=e=>[{name:"Compilation Logging",value:a.hw.Logging,element:()=>(0,b.jsx)(en,{})},{name:"Test Logging"+e,value:a.hw.Testing,element:()=>(0,b.jsx)(Qe,{})}];function x(e){return t=>n((n=>e(n,t)))}const m=null!==i&&!(0,v.VP)(i)&&i.identifier.endsWith(".md");l!==m&&s(m);const f=function(){if(null===t||(0,v.VP)(t))return"";const e=t;return` (${(0,K.count)(e,(e=>!e.isError&&null!==e.node))}/${(0,K.count)(e,(e=>null!==e.node))})`}(),g=m?u:u.splice(1),h=m||e.mainContainer!==a.J3.View?e.mainContainer:a.J3.Source;return(0,r.useEffect)((()=>{m&&e.mainContainer!==a.J3.View&&n((e=>e.setMainContainer(a.J3.View)))}),[l]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(jn,{container:!0,children:[(0,b.jsx)(An,{size:3,children:(0,b.jsxs)(vn,{children:[Sn(o,e.leftContainer),Cn(o,e.leftContainer,x(((e,n)=>e.setLeftContainer(n))))]})}),(0,b.jsx)(An,{size:6,children:(0,b.jsxs)(vn,{children:[Sn(g,h),Cn(g,h,x(((e,n)=>e.setMainContainer(n))))]})}),(0,b.jsx)(An,{size:3,children:(0,b.jsx)(vn,{children:(0,b.jsx)(bn,{children:(0,b.jsx)(Ie,{})})})})]}),(0,b.jsx)(yn,{children:(0,b.jsxs)(vn,{children:[Sn(d(f),e.bottomContainer),Cn(d(f),e.bottomContainer,x(((e,n)=>e.setBottomContainer(n))))]})})]})}}}]);
//# sourceMappingURL=2809.62c0d92d.chunk.js.map