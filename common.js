/* 공통: 툴 목록·헤더/푸터·측정·추적·설정저장을 한 곳에서 관리 */
(function(){
  var ROOT = window.SITE_ROOT || "./";

  /* ===== 측정 (집에서 ID만 채우면 전 페이지 자동 적용) ===== */
  var GA_ID = "";       // 예: "G-XXXXXXXXXX"  (Google Analytics 4 측정 ID)
  var CLARITY_ID = "";  // 예: "abcd1234ef"    (Microsoft Clarity 프로젝트 ID)
  if(GA_ID){
    var gs=document.createElement("script");gs.async=true;gs.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(gs);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
    gtag("js",new Date());gtag("config",GA_ID);
  }
  if(CLARITY_ID){
    (function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",CLARITY_ID);
  }
  /* 완료율 등 이벤트 추적 (ID 없으면 조용히 무시) */
  window.track=function(name,params){
    try{if(window.gtag)gtag("event",name,params||{});}catch(e){}
    try{if(window.clarity)clarity("event",name);}catch(e){}
  };
  /* 설정 기억 (localStorage, 실패해도 안전) */
  window.store={
    get:function(k,d){try{var v=localStorage.getItem("tool_"+k);return v===null?d:v}catch(e){return d}},
    set:function(k,v){try{localStorage.setItem("tool_"+k,v)}catch(e){}}
  };

  /* ===== 툴 목록: 새 툴은 여기 한 줄 추가 ===== */
  var TOOLS = [
    {path:"compress/",   ic:"🗜️", title:"이미지 용량 줄이기", desc:"원하는 KB로 압축",        cat:"이미지", pop:true},
    {path:"resize/",     ic:"📐", title:"이미지 크기 변경",   desc:"픽셀·퍼센트로 리사이즈",  cat:"이미지", pop:true},
    {path:"convert/",    ic:"🔄", title:"이미지 형식 변환",   desc:"PNG · JPG · WebP",         cat:"이미지"},
    {path:"img-to-pdf/", ic:"📄", title:"이미지 → PDF",       desc:"여러 장을 PDF 한 개로",   cat:"PDF", pop:true},
    {path:"word-count/", ic:"🔢", title:"글자 수 세기",       desc:"글자·단어·공백 카운트",   cat:"텍스트"},
    {path:"qr/",         ic:"▦",  title:"QR 코드 생성",       desc:"링크·텍스트 → QR 이미지", cat:"개발"},
    {path:"age/",        ic:"🎂", title:"만 나이 계산기",     desc:"생년월일로 만·연·세는나이", cat:"생활", pop:true},
    {path:"pick/",       ic:"🎲", title:"랜덤 뽑기·추첨",     desc:"이름 넣고 무작위 추첨",   cat:"생활"}
  ];
  window.TOOLS = TOOLS;
  window.SITE_NAME = "만들다 <span>툴</span>"; // 임시 브랜드(도메인 정할 때 교체)

  function h(html){var d=document.createElement("div");d.innerHTML=html.trim();return d.firstChild}

  /* 헤더 */
  var head=document.getElementById("site-header");
  if(head){
    head.className="sitehead";
    head.appendChild(h('<a class="brand" href="'+ROOT+'">'+window.SITE_NAME+'</a>'));
    head.appendChild(h('<a class="home" href="'+ROOT+'">← 전체 도구</a>'));
  }
  /* 푸터 (상호링크) */
  var foot=document.getElementById("site-footer");
  if(foot){
    foot.className="sitefoot";
    var links=TOOLS.map(function(t){return '<a href="'+ROOT+t.path+'">'+t.title+'</a>'}).join("");
    foot.appendChild(h('<div class="fnav">'+links+'</div>'));
    foot.appendChild(h('<div>모든 처리는 브라우저에서 이루어지며 파일은 서버로 전송되지 않습니다 · <a href="'+ROOT+'privacy.html">개인정보처리방침</a></div>'));
  }
  /* 홈 그리드 */
  var grid=document.getElementById("tools");
  if(grid){
    function card(t){return '<a class="toolcard" href="'+ROOT+t.path+'">'+(t.pop?'<span class="pop">인기</span>':'')+'<span class="ic">'+t.ic+'</span><b>'+t.title+'</b><small>'+t.desc+'</small></a>'}
    var pops=TOOLS.filter(function(t){return t.pop});
    if(pops.length){
      grid.appendChild(h('<div class="cat">🔥 인기 도구</div>'));
      var pg=h('<div class="grid"></div>');
      pops.forEach(function(t){pg.appendChild(h(card(t)))});
      grid.appendChild(pg);
    }
    var cats=[];TOOLS.forEach(function(t){if(cats.indexOf(t.cat)<0)cats.push(t.cat)});
    cats.forEach(function(c){
      grid.appendChild(h('<div class="cat">'+c+'</div>'));
      var g=h('<div class="grid"></div>');
      TOOLS.filter(function(t){return t.cat===c}).forEach(function(t){g.appendChild(h(card(t)))});
      grid.appendChild(g);
    });
  }
})();
