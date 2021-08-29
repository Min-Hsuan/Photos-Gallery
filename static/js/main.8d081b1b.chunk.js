(this["webpackJsonpreact-project-flickr-api"]=this["webpackJsonpreact-project-flickr-api"]||[]).push([[0],{11:function(e,t,n){e.exports={title:"LikeList_title__3f9mp","like-list":"LikeList_like-list__EmSo-","like-item":"LikeList_like-item__m02SC",img:"LikeList_img__2mY6S",actions:"LikeList_actions__NRe9l",button:"LikeList_button__3h_V3","close-button":"LikeList_close-button__3o3Y6"}},33:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(10),r=n.n(a),i=n(13),o=(n(33),n(9)),l=n(4),j=n(16),u=n(14),d=n(2),b=s.a.createContext({images:[],addLike:function(e){},removeLike:function(e){}}),h=function(e){var t=Object(c.useState)([]),n=Object(o.a)(t,2),s=n[0],a=n[1],r={images:s,addLike:function(e){s.find((function(t){return e.id===t.id}))||a((function(t){return t.concat(e)}))},removeLike:function(e){a((function(t){return t.filter((function(t){return t.id!==e}))}))}};return Object(d.jsx)(b.Provider,{value:r,children:e.children})},O=["nature","ocean","froest","sunrise","snow"],x=function(e){var t=Object(c.useContext)(b),n=Object(c.useState)(""),s=Object(o.a)(n,2),a=s[0],r=s[1],l=t.images.length;return Object(d.jsxs)("header",{children:[Object(d.jsxs)("div",{className:"head",children:[Object(d.jsx)(i.b,{to:"/",className:"logo",children:"Photos Gallery"}),Object(d.jsxs)("button",{onClick:e.onOpen,className:"like-button",children:[Object(d.jsx)("span",{className:"total-number",children:l}),Object(d.jsx)(u.a,{})]})]}),Object(d.jsx)("p",{className:"subtitle",children:"All photos are from Flickr"}),Object(d.jsx)("form",{onSubmit:function(t){t.preventDefault(),e.onLoadSearch(a),r("")},children:Object(d.jsxs)("div",{className:"action",children:[Object(d.jsx)("input",{className:"input",type:"text",placeholder:"Search for high-resolution photos",value:a,onChange:function(e){r(e.target.value)},required:!0}),Object(d.jsx)("button",{className:"button",type:"submit",children:Object(d.jsx)(j.b,{})})]})}),Object(d.jsxs)("ul",{className:"keyword-list",children:[Object(d.jsx)("span",{children:"Most popular:"}),O.map((function(e){return Object(d.jsx)("li",{className:"keyword",children:Object(d.jsx)(i.b,{to:"/search/".concat(e),children:e})},100*Math.random())}))]})]})},m=n(22),f=n.n(m),p=n(24),v=s.a.createContext({images:[],isLoading:!1,error:null,requestDatas:function(e){}}),g={datas:[],isLoading:!1,error:null},k=function(e,t){switch(t.type){case"SEND":return{datas:[],isLoading:!0,error:null};case"SUCCESS":return{datas:t.datas,isLoading:!1,error:null};case"FAILED":return{datas:[],isLoading:!1,error:t.errorMessage};default:throw new Error("Should not be reached!")}},N=function(e){var t=Object(c.useReducer)(k,g),n=Object(o.a)(t,2),s=n[0],a=n[1],r=Object(c.useCallback)(function(){var e=Object(p.a)(f.a.mark((function e(t){var n,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a({type:"SEND"}),e.prev=1,e.next=4,fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=".concat("80f6bdf0e158fc0cbcb0079320efec39","&tags=").concat(t,"&per_page=48&format=json&nojsoncallback=1"));case 4:return n=e.sent,e.next=7,n.json();case 7:if("ok"===(c=e.sent).stat){e.next=10;break}throw new Error("Encountered an error with fetching and parsing data. "+c.message);case 10:a({type:"SUCCESS",datas:c.photos.photo}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),a({type:"FAILED",errorMessage:e.t0.message});case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}(),[]),i={images:s.datas,isLoading:s.isLoading,error:s.error,requestDatas:r};return Object(d.jsx)(v.Provider,{value:i,children:e.children})},w=function(e){return Object(d.jsxs)("div",{className:"error",children:[Object(d.jsx)(j.a,{}),e.children]})},L=n(17),C=function(e){var t=e.downloadUrl,n=e.url,s=e.id,a=e.title,r=e.onOpen,i=Object(c.useContext)(b);return Object(d.jsxs)("li",{className:"item",children:[Object(d.jsx)("img",{src:n,alt:a}),Object(d.jsxs)("div",{className:"user-actions",children:[Object(d.jsx)("button",{className:"user-action",onClick:function(){i.addLike({id:s,url:n,downloadUrl:t,title:a}),r()},children:Object(d.jsx)(u.a,{})}),Object(d.jsx)("a",{href:t,download:!0,className:"user-action",children:Object(d.jsx)(L.a,{})})]})]})};var _=function(e){var t=Object(c.useState)(window.innerWidth),n=Object(o.a)(t,2),s=n[0],a=n[1];Object(c.useEffect)((function(){window.addEventListener("resize",(function(){a(window.innerWidth)}))}),[]);var r=3;s<768&&(r=2),s<480&&(r=1);var i,l=Math.floor(e.data.length/r);e.data.length>0?i=function(e,t){for(var n=0,c=[];n<e.length;)c.push(e.slice(n,n+=t));return c}(e.data,l).map((function(t){var n=t.map((function(t){var n="https://live.staticflickr.com/".concat(t.server,"/").concat(t.id,"_").concat(t.secret,"_z.jpg"),c="https://live.staticflickr.com/".concat(t.server,"/").concat(t.id,"_").concat(t.secret,"_z_d.jpg");return Object(d.jsx)(C,{url:n,title:t.title,downloadUrl:c,id:t.id,onOpen:e.onOpen},t.id)}));return Object(d.jsx)("ul",{className:"list",children:n},100*Math.random())})):i=Object(d.jsx)("p",{children:"No Images Found"});return Object(d.jsx)("div",{className:"list-box",style:{"--column":r},children:i})},S=n(25),E=function(){return Object(d.jsx)("div",{className:"spinner",children:Object(d.jsx)(S.a,{})})},y=function(e){var t=e.searchText,n=e.showTitle,s=e.onOpen,a=Object(c.useContext)(v),r=a.requestDatas,i=a.images,o=a.error,l=a.isLoading;return Object(c.useEffect)((function(){r(t)}),[r,t]),Object(d.jsxs)("div",{className:"output",children:[n&&!l&&Object(d.jsx)("h2",{className:"search-title",children:t}),!o&&!l&&Object(d.jsx)(_,{data:i,onOpen:s}),l&&Object(d.jsx)("div",{className:"center",children:Object(d.jsx)(E,{})}),o&&Object(d.jsx)(w,{children:o})]})},F=n(46),D=(n(44),function(e){return Object(d.jsx)(F.a,{in:e.show,timeout:300,mountOnEnter:!0,unmountOnExit:!0,classNames:{enter:"",enterActive:"ModalOpen",exit:"",exitActive:"ModalClosed"},children:Object(d.jsx)("div",{className:"overlay",children:e.children})})}),T=function(e){return Object(d.jsx)(F.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:0,children:Object(d.jsx)("div",{className:"backdrop",onClick:e.onClose})})},M=document.getElementById("overlays"),P=function(e){return Object(d.jsxs)(s.a.Fragment,{children:[r.a.createPortal(Object(d.jsx)(T,{onClose:e.onClose,show:e.show}),M),r.a.createPortal(Object(d.jsx)(D,{onClose:e.onClose,show:e.show,children:e.children}),M)]})},I=n(26),U=n(11),A=n.n(U),q=n(47),z=function(e){var t=Object(c.useContext)(b),n=t.images,a=t.removeLike,r=t.images.length,i=n.map((function(e){return Object(d.jsx)(F.a,{timeout:200,classNames:"fade-out",children:Object(d.jsxs)("li",{className:A.a["like-item"],children:[Object(d.jsx)("div",{className:A.a.img,children:Object(d.jsx)("img",{src:e.url,alt:e.title})}),Object(d.jsxs)("div",{className:A.a.actions,children:[Object(d.jsx)("button",{onClick:function(){a(e.id)},className:A.a.button,children:"-"}),Object(d.jsx)("a",{download:!0,href:e.downloadUrl,className:A.a.button,children:Object(d.jsx)(L.a,{})})]})]})},e.id)}));return Object(d.jsxs)(s.a.Fragment,{children:[Object(d.jsxs)("div",{className:A.a.title,children:[Object(d.jsx)("span",{children:"Collection list"}),Object(d.jsxs)("div",{className:"like-button",children:[Object(d.jsx)("span",{className:"total-number",children:r}),Object(d.jsx)(u.a,{})]})]}),Object(d.jsx)(q.a,{component:"ul",className:A.a["like-list"],children:i}),Object(d.jsx)("button",{className:A.a["close-button"],onClick:e.onClose,children:Object(d.jsx)(I.a,{})})]})};var B=function(){var e=Object(l.g)(),t=Object(c.useState)(!1),n=Object(o.a)(t,2),a=n[0],r=n[1],i=function(){r(!1)},j=function(){r(!0)};return Object(d.jsxs)(s.a.Fragment,{children:[Object(d.jsx)(x,{onLoadSearch:function(t){var n="/search/".concat(t);e.push(n)},onOpen:j}),Object(d.jsx)(P,{onClose:i,show:a,children:Object(d.jsx)(z,{onClose:i})}),Object(d.jsxs)(l.d,{children:[Object(d.jsx)(l.b,{path:"/",exact:!0,children:Object(d.jsx)(y,{searchText:"taiwan",onOpen:j})}),Object(d.jsx)(l.b,{path:"/search/:searchText",render:function(e){return Object(d.jsx)(y,{showTitle:!0,searchText:e.match.params.searchText,onOpen:j})}}),Object(d.jsx)(l.b,{path:"*",children:Object(d.jsx)(l.a,{to:"/"})})]})]})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};r.a.render(Object(d.jsx)(h,{children:Object(d.jsx)(i.a,{children:Object(d.jsx)(N,{children:Object(d.jsx)(B,{})})})}),document.getElementById("root")),J()}},[[45,1,2]]]);
//# sourceMappingURL=main.8d081b1b.chunk.js.map