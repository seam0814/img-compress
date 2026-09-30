/* 공통: 툴 목록을 여기 한 곳에서 관리 → 새 툴은 이 배열에 한 줄 추가 */
(function(){
  var ROOT = window.SITE_ROOT || "./";
  var TOOLS = [
    {path:"compress/",   ic:"🗜️", title:"이미지 용량 줄이기", desc:"원하는 KB로 압축",        cat:"이미지"},
    {path:"resize/",     ic:"📐", title:"이미지 크기 변경",   desc:"픽셀·퍼센트로 리사이즈",  cat:"이미지"},
    {path:"convert/",    ic:"🔄", title:"이미지 형식 변환",   desc:"PNG · JPG · WebP",         cat:"이미지"},
    {path:"img-to-pdf/", ic:"📄", title:"이미지 → PDF",       desc:"여러 장을 PDF 한 개로",   cat:"PDF"},
    {path:"word-count/", ic:"🔢", title:"글자 수 세기",       desc:"글자·단어·공백 카운트",   cat:"텍스트"},
    {path:"qr/",         ic:"▦",  title:"QR 코드 생성",       desc:"링크·텍스트 → QR 이미지", cat:"개발"}
  ];
  window.TOOLS = TOOLS;
  window.SITE_NAME = "만들다 <span>툴</span>"; // 임시 브랜드(도메인 정할 때 교체)

  function h(html){ var d=document.createElement("div"); d.innerHTML=html.trim(); return d.firstChild; }

  // 헤더 주입
  var head=document.getElementById("site-header");
  if(head){
    head.className="sitehead";
    head.appendChild(h('<a class="brand" href="'+ROOT+'">'+window.SITE_NAME+'</a>'));
    head.appendChild(h('<a class="home" href="'+ROOT+'">← 전체 도구</a>'));
  }
  // 푸터 주입 (다른 도구 상호링크)
  var foot=document.getElementById("site-footer");
  if(foot){
    foot.className="sitefoot";
    var links=TOOLS.map(function(t){return '<a href="'+ROOT+t.path+'">'+t.title+'</a>';}).join("");
    foot.appendChild(h('<div class="fnav">'+links+'</div>'));
    foot.appendChild(h('<div>모든 처리는 브라우저에서 이루어지며 파일은 서버로 전송되지 않습니다 · <a href="'+ROOT+'privacy.html">개인정보처리방침</a></div>'));
  }
  // 허브 그리드 렌더 (홈에서만)
  var grid=document.getElementById("tools");
  if(grid){
    var cats=[]; TOOLS.forEach(function(t){if(cats.indexOf(t.cat)<0)cats.push(t.cat);});
    cats.forEach(function(c){
      grid.appendChild(h('<div class="cat">'+c+'</div>'));
      var g=h('<div class="grid"></div>');
      TOOLS.filter(function(t){return t.cat===c;}).forEach(function(t){
        g.appendChild(h('<a class="toolcard" href="'+ROOT+t.path+'"><span class="ic">'+t.ic+'</span><b>'+t.title+'</b><small>'+t.desc+'</small></a>'));
      });
      grid.appendChild(g);
    });
  }
})();
