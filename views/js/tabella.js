function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function templateTabella(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (Object, righe) {;pug_debug_line = 1;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctable class=\"table table-striped\"\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Ftabella.pug";
// iterate Object.keys(righe[0])
;(function(){
  var $$obj = Object.keys(righe[0]);
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var chiave = $$obj[pug_index0];
;pug_debug_line = 5;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = chiave) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var chiave = $$obj[pug_index0];
;pug_debug_line = 5;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = chiave) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Ftabella.pug";
// iterate righe
;(function(){
  var $$obj = righe;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var riga = $$obj[pug_index1];
;pug_debug_line = 8;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Ftabella.pug";
// iterate riga
;(function(){
  var $$obj = riga;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var value = $$obj[pug_index2];
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var value = $$obj[pug_index2];
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var riga = $$obj[pug_index1];
;pug_debug_line = 8;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Ftabella.pug";
// iterate riga
;(function(){
  var $$obj = riga;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var value = $$obj[pug_index3];
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var value = $$obj[pug_index3];
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Ftabella.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";}.call(this,"Object" in locals_for_with?locals_for_with.Object:typeof Object!=="undefined"?Object:undefined,"righe" in locals_for_with?locals_for_with.righe:typeof righe!=="undefined"?righe:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}