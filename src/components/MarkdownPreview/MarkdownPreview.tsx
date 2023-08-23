import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula'

const MarkdownPreview = ({ content, className }: { content: string; className?: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      children={content}
      className={className}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={dracula}
              language={match[1]}
              PreTag='div'
              showLineNumbers={true}
              customStyle={{
                borderRadius: '0',
                backgroundColor: '#24292e',
              }}
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}

export default MarkdownPreview
