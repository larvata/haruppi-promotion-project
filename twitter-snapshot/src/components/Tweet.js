import React from 'react';
import moment from 'moment-timezone';
import twemoji from 'twemoji';

const getBiggerProfileImageUrl = () => {

};

const getTweetTextSize = (tweet, isRetweet) => {
  // disable auto tweet text size
  return 'TweetTextSize--16px';

  if (isRetweet) {
    return 'TweetTextSize--16px';
  }

  if (tweet.entities &&
    tweet.entities.user_mentions &&
    tweet.entities.user_mentions.length !== 0) {
    return 'TweetTextSize--16px';
  }

  const { retweet_count } = tweet;
  if (retweet_count > 30) {
    return 'TweetTextSize--26px';
  }
  else {
    return 'TweetTextSize--16px';
  }
};

const renderTweetText = (tweet) => {
  const { text, is_quote_status, entities } = tweet;

  // replace short url to full length url
  let result = text;

  if (entities && entities.urls) {
    entities.urls.forEach(uo => {
      result = result.replace(uo.url, uo.display_url);
    });

    if (is_quote_status) {
      const lastEntity = entities.urls.slice(-1)[0];
      result = result.replace(lastEntity.display_url, '');
    }
  }

  if (entities && entities.media) {
    // console.log('remove media url');
    entities.media.forEach(mo => {
      // console.log(mo.url);
      result = result.replace(mo.url, '');
    });
  }

  if (entities && entities.hashtags) {
    entities.hashtags.forEach(ho => {
      const rep = `<a href="#"><s>#</s><b>${ho.text}</b>`;
      result = result.replace(`#${ho.text}`, rep);
    });
  }

  // replace emoji with image
  result = twemoji.parse(result, {
    className: 'Emoji Emoji--forText',
  });

  return result;
};

const isOnlyRetweet = (tweet) => {
  const { entities } = tweet;
  if (!entities || !entities.user_mentions || entities.user_mentions.length === 0) {
    return false;
  }

  const result = entities.user_mentions.some(um => um.indices[0] === 3);
  return result;
};

const renderQuoteTweet = (tweet, trans) => {
  const { user, text } = tweet;
  // const { trans } = this.props;
  const transItem = trans.find(t => t.text === tweet.text);
  // let transText = '';
  // if (transItem) {
  //   transText = transItem.trans;
  // }

  return (
    <div className="QuoteTweet u-block">
      <div className="QuoteTweet-container">
        <div className="QuoteTweet-innerContainer" data-item-type="tweet">
          <div className="tweet-content">
            <div className="QuoteTweet-authorAndText u-alignTop">
              <span className="QuoteTweet-originalAuthor u-cf u-textTruncate">
                <b className="QuoteTweet-fullname">
                  {user.name}
                </b>{'\n'}
                <span className="QuoteTweet-screenname u-dir" dir="ltr">
                  <span className="at">@</span>
                  {user.screen_name}{'\n'}
                </span>
              </span>
              <div
                className="QuoteTweet-text tweet-text u-dir"
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: renderTweetText(tweet) }}
              />
              <div
                className="QuoteTweet-text tweet-text u-dir translate"
                dir="ltr"
              >
                {transItem.trans}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderAdaptiveMedia = (tweet) => {
  const { extended_entities } = tweet;
  if (!extended_entities || !extended_entities.media || extended_entities.media.length === 0) {
    return null;
  }

  const { media } = extended_entities;
  let photoCountClassName = '';
  let photoContainerClassName = '';
  let photoStyle = {};
  switch (media.length) {
    case 1:
      photoCountClassName = 'AdaptiveMedia-singlePhoto';
      photoContainerClassName = '';
      photoStyle = { width: '100%', left: '-0px' };
      break;
    case 2:
      photoCountClassName = 'AdaptiveMedia-doublePhoto';
      photoContainerClassName = 'AdaptiveMedia-halfWidthPhoto';
      photoStyle = { height: '100%', left: '-0px' };
      break;
    case 3:
      break;
    default:
      photoCountClassName = '';
  }

  return (
    <div className="AdaptiveMedia">
      <div className="AdaptiveMedia-container">
        <div className={photoCountClassName}>
          {media.map(m => {
            return (
              <div className={photoContainerClassName}>
                <div className="AdaptiveMedia-photoContainer">
                  <img src={m.media_url} style={photoStyle} alt="" />
                </div>
              </div>);
          })}
        </div>
      </div>
    </div>
  );
};


const renderTweetContent = (tweet, trans, isRetweet) => {
  const { user, is_quote_status, quoted_status, created_at } = tweet;
  const quoteTweet = (is_quote_status && quoted_status) ? renderQuoteTweet(quoted_status, trans) : null;
  const adaptiveMedia = renderAdaptiveMedia(tweet);
  const additionalParts = [quoteTweet, adaptiveMedia];

  const tweetTextSizeClassName = getTweetTextSize(tweet, isRetweet);

  const postDate = moment(new Date(created_at));

  const transItem = trans.find(tr => tr.text === tweet.text) || {};

  return (
    <div className="content">
      <div className="stream-item-header">
        <a className="account-group">
          <img className="avatar" src={user.profile_image_url.replace('normal', 'bigger')} alt="" />
          <strong className="fullname">{user.name}</strong>{'\n'}
          <span>&rlm;</span>{'\n'}
          <span className="username">
            <s>@</s>
            <b>{user.screen_name}</b>
          </span>
        </a>{'\n'}
        <small className="time">
          <a className="tweet-timestamp">{'\n'}
            <span className="">{postDate.format('HH:mm:ss')}</span>
          </a>
        </small>
      </div>
      <div>
        <p
          className={`${tweetTextSizeClassName} TweetTextSize tweet-text`}
          dangerouslySetInnerHTML={{ __html: renderTweetText(tweet) }}
        />
        <p className={`${tweetTextSizeClassName} TweetTextSize tweet-text translate`}>
          {transItem.trans}
        </p>
      </div>
      {additionalParts}
    </div>
  );
};

export default (props) => {
  const { tweet, trans } = props;
  const { retweeted_status } = tweet;
  // const { is_quote_status, quoted_status } = tweet;

  // const quoteTweet = (is_quote_status && quoted_status) ? renderQuoteTweet(quoted_status) : null;
  // const adaptiveMedia = renderAdaptiveMedia(tweet);
  // const additionalParts = [quoteTweet, adaptiveMedia];

  // console.log(adaptiveMedia);

  let tweetContent = null;
  let retweetHeaderContent = null;
  const onlyRetweet = isOnlyRetweet(tweet);
  if (onlyRetweet) {
    console.log('isOnlyRetweet: true');
    tweetContent = renderTweetContent(retweeted_status, trans, true);
    retweetHeaderContent = (
      <div className="context">
        <div className="tweet-context with-icn">
          <span className="Icon Icon--small Icon--retweeted" />{'\n'}
          <span>
            <a className="pretty-link" href="#">
              <b>{`${tweet.user.name} 转推了`}</b>
            </a>
          </span>
        </div>
      </div>
    );
  }
  else {
    tweetContent = renderTweetContent(tweet, trans, false);
  }

  return (
    <li className="stream-item">
      <div className="tweet">
        {retweetHeaderContent}
        {tweetContent}
      </div>
    </li>
  );

};
