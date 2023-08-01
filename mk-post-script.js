/* <cmd>(コマンドラインのスタイルとpre/blockquote等のブロックレベル要素にする)認識 */
function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

const cmdElements = document.querySelectorAll("cmd");
cmdElements.forEach((element) => {
	element.innerHTML = `<pre><code>`+escapeHtml(element.innerHTML)+`</code></pre>`;
	//console.log(element.innerHTML);
});
//jQuery ver
/*
document.addEventListener('DOMContentLoaded', () => {
	$('cmd').each( function(index) {
		var ht=$(this).html();
		//ht.replace(/</g, "&lt;");
		//ht.replace(/>/g, "&gt;");
		//ht.replace(/\n/g, "&lt;br&gt;");
		//$(this).html(`<pre><code>`+ht+`</code></pre>`);
		console.log(ht);
		$(this).html(`<pre><code>`+`</code></pre>`);
	});
});
*/



/* 目次の追加 */
/* https://qiita.com/RYO_nami/items/10cb1db00b200e1288ca 参照
document.addEventListener('DOMContentLoaded', () => {
    const heads = document.querySelectorAll('h2, h3, h4, h5, h6');
    if (heads && heads.length) {
        let contents = '';
        heads.forEach((head, i) => {
            let className = '';
            switch(head.localName) {
                case "h1":
                    className = `contents1`;
                    break;
                case "h2":
                    className = `contents2`;
                    break;
                case "h3":
                    className = `contents3`;
                    break;
                case "h4":
                    className = `contents4`;
                    break;
                case "h5":
                    className = `contents5`;
                    break;
                case "h6":
                    className = `contents6`;
                    break;
            }
            contents += `<li class="toc"><a class="${className}" href="#head${i}">${head.textContent}</a></li>`;
            head.innerHTML += `<a id="head${i}"></a>`;
        })
        document.querySelector('#table-of-content').innerHTML += `<ol>${contents}</ol>`;
    }
});
/*
h1:	title
h2:	year
h3:	mm/date(week)
h4:	section
h5:	subsection
h6:	subsubsection
 */





/* <rubi>(HTMLでルビを自動挿入する)タグ認識 */
/* フォーマット：<rubi>漢字(ふりがな)</rubi> */
//*
//JS ver
document.addEventListener('DOMContentLoaded', () => {
	const rubi = document.querySelectorAll("rubi");
	rubi.forEach((x, i) => {
		let str = x.textContent.split('(',2);
		let kanji = str[0];
		let kana = str[1].substring(0, str[1].length - 1);

		x.innerHTML=
			`
				<ruby>
					<rb>${kanji}</rb>
					<rp>(</rp><rt>${kana}</rt><rp>)</rp>
				</ruby>
			`;
	})
});
//*/
/*jQuery ver
document.addEventListener('DOMContentLoaded', () => {
	$('rubi').each( function(index) {
		$(this).html(`<a href="`+$(this).text()+`" target="_blank">`+$(this).text()+`</a><br>`);
	});
});
*/








/*
 * qタグで斜体にしたときに，brしてしまうと行頭が揃わない．
 * したがって，qタグの本文にbrがあればそのあとに
 * 「&emsp;」(全角スペース)を挿入する
 * 「&emsp;」(半角スペース)
*/
/*
document.addEventListener('DOMContentLoaded', () => {
	$('q').each( function(index) {
		var ht = $(this).html();
		var res="";
		//ht=ht.replace(/<br>/g,"<br>&emsp;");
		var arr = ht.split("<br>");
		for(var i = 0; i < arr.length; ++i) {
			res+="<span>" + arr[i] + "<span><br>";
		}
		$(this).html(res);
	});
});
*/
//*JS ver
document.addEventListener('DOMContentLoaded', () => {
	const q = document.querySelectorAll("q");
	q.forEach((x, i) => {
		var str = x.innerHTML.split('<br>');
		var res = `&ensp;<span class="i">` + str[0] + `</span>`;
		for(var i = 1; i < str.length; ++i) {
			res+=`<br>&ensp;<span class="i">` + str[i] + `</span>`;
		}
		x.innerHTML=res;
		//console.log(res);
	})
});
//*/












/* <img>のaltをキャプションとして挿入し，また画像クリックを可能にする */
/*
//JS ver, 未完成
document.addEventListener('DOMContentLoaded', () => {
	$('fig').forEach((x, i) => {
		let src = x.attr('src');
		let alt = x.attr('alt');
		let w = x.attr('width');
		x.innerHTML=`<br><figure>`+
						`<a href="${src}"  target="_blank">`+
							`<img src="${src}" alt="${alt}" width="${w}">`+
						`</a>`+
						`<figcaption>${alt}</figcaption>`+
					`</figure><br><br>`;
	})
});
*/
//jQuery ver
document.addEventListener('DOMContentLoaded', () => {
	$('fig').each( function(index) {
		$(this).html(
			`<br><figure>`+
				`<a href="`+$(this).attr('src')+`"  target="_blank">`+
					`<img src="`+$(this).attr('src')+
					`" alt="`+$(this).attr('alt')+
					`" width="`+$(this).attr('width')+`">`+
				`</a>`+
				`<figcaption>fig: `+$(this).attr('alt')+`</figcaption>`+
			`</figure><br><br>`
		);
	});
});



/* 節識別の為の函数
document.addEventListener('DOMContentLoaded', () => {
	const heads = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	if (heads && heads.length) {
        heads.forEach(() => {
			let className = '';
            switch(head.localName) {
                case "h1":
                    className = `contents1`;
                    break;
                case "h2":
                    className = `contents2`;
                    break;
                case "h3":
                    className = `contents3`;
                    break;
                case "h4":
                    className = `contents4`;
                    break;
                case "h5":
                    className = `contents5`;
                    break;
                case "h6":
                    className = `contents6`;
                    break;
            }
            contents += `<li class="toc"><a class="${className}" href="#head${i}">${head.textContent}</a></li>`;
            head.innerHTML += `<a id="head${i}"></a>`;
		})
    }
});*/



/* <url>(HTMLでハイパーリンクと表示する文字列を同じにする)認識 */
/*
//JS ver
document.addEventListener('DOMContentLoaded', () => {
	const url = document.querySelectorAll("url");
	url.forEach((x, i) => {
		let str = x.textContent;
		x.innerHTML=`<a href="${str}" target="_blank">${str}</a>`;
	})
});
*/
//jQuery ver
document.addEventListener('DOMContentLoaded', () => {
	$('url').each( function(index) {
		var temp = "";
		if($(this).attr('type')=='WebPage') {
			temp = `author &emsp;&emsp;&nbsp; : &emsp;` + $(this).attr('author') + `<br>`
					+ `title &emsp;&emsp;&emsp;&nbsp;&nbsp; : &emsp;` + $(this).attr('title') + `<br>`
					+ `Web name &nbsp; : &emsp;` + $(this).attr('name') + `<br>`
					+ `update &emsp;&emsp; : &emsp;` + $(this).attr('update') + `<br>`
					+ `refer &emsp;&emsp;&emsp; : &emsp;` + $(this).attr('refer') + `<br>`;
		}

		$(this).html(
			`<div class="note">`
				+ temp
				+`<a class="url" href="`+$(this).text()+`" target="_blank">`
					+$(this).text()
				+`</a><br>`
			+`</div>`
		);
	});
});
/*
図書 Book
著者名, "書名", 版表示, 出版者, 出版年, 総頁(引用頁), (シリーズ名, シリーズ数).
author, title, ver, publisher, publishY, pages, series

雑誌論文 Monograph
著者名, 記事タイトル, 雑誌名, 出版年, 巻数(号数), はじめ頁 - 終わり頁.
author, title, name, publishY, volumes, pages

Webページ WebPage
著者名, “Webページのタイトル”, Webサイトの名称, 更新日付, URL, 参照年月日.
author, title, name, update, refer

紙新聞 Paper
記事タイトル, 新聞紙名, 出版年月日, 朝刊/夕刊, 版, 該当ページ.
title, name, publishT, edition, ver, pages

Web新聞 DigitalPaper
記事タイトル, 新聞紙名, 掲載年月日, webサイト名, URL, 参照年月日.
title, company, publishT, name, refer

データベース新聞 DatabasePapaer
記事タイトル, 新聞紙名, 掲載年月日, 朝刊/夕刊, 版, 該当ページ, データベース名, URL, 参照年月日.
title, company, update, edition, ver, pages, dbname, refer


近畿大学中央図書館レファレンス課, "引用と参考文献の書き方", 近畿大学中央図書館, 2022-05-01更新,
"https://www.clib.kindai.ac.jp/search/pdf/guide_quote.pdf", 2022-12-23参照.


 */





