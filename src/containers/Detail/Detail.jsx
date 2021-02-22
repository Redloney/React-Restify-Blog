import React from 'react';
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import './Detail.scss'
import markdown from './m.md'

import CodeBlock from './CodeBlock'

const Detail = (props) => {

  console.log('detail', props);
  return (
    <div className="detail">
      <h2>文章详细页面</h2>
      <ReactMarkdown
        source={markdown}
        escapeHtml={false}
        plugins={
          htmlParser
        }
        renderers={{
          code: CodeBlock
        }}
      />
    </div>
  );
}

export default Detail;
