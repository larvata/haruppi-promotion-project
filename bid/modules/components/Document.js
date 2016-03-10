import React from 'react';

const { arrayOf, string, node, object } = React.PropTypes;

const shims = `
  (String.prototype.trim && Function.prototype.bind) || document.write('<script src="/es5-shim.js"><\\/script>');
  window.Promise || document.write('<script src="/Promise.js"><\\/script>');
  window.fetch || document.write('<script src="/fetch.js"><\\/script>');
  Object.assign || document.write('<script src="/object-assign.js"><\\/script>');
`;

const Document = React.createClass({
  propTypes: {
    styles: arrayOf(node),
    scripts: arrayOf(node),
    content: string,
    title: string,
    initialState: object
  },

  render() {
    const { styles, scripts, content, title, initialState } = this.props;

    console.log('render document');
    console.log(content);

    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{title}</title>
          {styles}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }}/>
          <script dangerouslySetInnerHTML={{ __html: shims }}/>
          {initialState &&
            <script dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};`
            }}/>
          }
          {scripts}
        </body>
      </html>
    );
  }

});

export default Document;
