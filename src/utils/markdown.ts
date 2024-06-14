import mermaidPlugin from '@agoose77/markdown-it-mermaid'
import MarkdownIt from 'markdown-it'
import markdown_it_katex_external from 'markdown-it-katex-external'
// import markdown_it_emoji from 'markdown-it-emoji'
import markdown_it_container from 'markdown-it-container'
import markdown_it_sup from 'markdown-it-sup'
import markdown_it_sub from 'markdown-it-sub'
import markdown_it_footnote from 'markdown-it-footnote'
import markdown_it_abbr from 'markdown-it-abbr'
import markdown_it_ins from 'markdown-it-ins'
import markdown_it_mark from 'markdown-it-mark'
import generated from '@iktakahiro/markdown-it-katex'

export default function markdownToHtml(content: any) {
  const md = new MarkdownIt({
    html: true
  })
    .use(markdown_it_katex_external)
    // .use(markdown_it_emoji)
    .use(markdown_it_container, 'hljs-center')  // 容器插件
    .use(markdown_it_container, 'hljs-left')
    .use(markdown_it_container, 'hljs-right')
    .use(markdown_it_sup)                       // 上角标插件
    .use(markdown_it_sub)                       // 下角标插件
    .use(markdown_it_footnote)                  // 脚注插件
    .use(markdown_it_abbr)                      // 缩写插件
    .use(markdown_it_ins)                       // 插入插件
    .use(markdown_it_mark)                      // 标记插件
    .use(generated)
    .use(mermaidPlugin)
  return md.render(content)
}
