// the list of websites - handpicked;

/*can send a list 

<div class="gsc-webResult gsc-result"> - from Haff post
same from NewYorker

Option 1: run the search on the websites,
go through all links on the resulting page, get full pages from the search.
Count the presence of word on the page, check that it is greater than one.
Extract the paragraph, add to results array.

Option 2: do the proper crawling of the websites, copy the content if the page has the keyword.

Option 3: submit a special google request which is only limited to certain websites.

https://www.google.com/?gws_rd=ssl#q=%22hacking%22+link:www.huffingtonpost.com

Option 3 seems to be the easiest thing to do.

I get 10 per page.

<li class="g"><!--m--><div class="rc" data-hveid="29"><h3 class="r"><a href="http://www.huffingtonpost.com/2014/10/28/hacking-fear-poll_n_6057100.html" onmousedown="return rwt(this,'','','','1','AFQjCNF-3W9zTUi5ozD-beHyhYKzA2NarA','XwN0ufzU8EKkX3PSCo7-2g','0CB4QFjAA','','',event)">Americans Fear <em>Hacking</em> More Than Any Other Crime, Poll <b>...</b></a></h3><div class="s"><div><div class="f kv _SWb" style="white-space:now

Collect links, send more get requests (for all ten). So far 30 pages.

Go through the page, look for the key word, select the <p> with this word,
fetch the text from this <p>, add to the results array.


GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=011401941214739866178:jv3spknumbi&q=lectures

GET https://www.googleapis.com/customsearch/v1?key=AIzaSyA2yTuER8fAeUQ6SA-iTNCsnrpb7IuoCuY&cx=017576662512468239146:omuauf_lfve&q=lectures
Project ID: azotovasolomvp Project Number: 146447511107

Project Number: 53227959942
Project ID: deft-beanbag-782
API key: AIzaSyA2yTuER8fAeUQ6SA-iTNCsnrpb7IuoCuY
10.6.29.227
10.7.21.240
API key 2: AIzaSyBqY5NGrkCS-KMpztYjdF_kRj3PnbSa7TI

<script>
  (function() {
    var cx = '011401941214739866178:jv3spknumbi';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>
011401941214739866178:f8vo_xofsfi
econgrowth
*/
