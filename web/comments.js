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
*/
