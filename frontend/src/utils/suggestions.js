export function analyzeText(text="", file) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const hashtags = (text.match(/#[\w-]+/g) || []);
  const mentions = (text.match(/@[\w-]+/g) || []);

  const advice = [];
  if(words.length < 20) advice.push({title:"Short post",level:"suggestion",recommendation:"Add more text for engagement."});
  else advice.push({title:"Text length okay",level:"ok",recommendation:`${words.length} words.`});

  if(hashtags.length===0) advice.push({title:"No hashtags",level:"suggestion",recommendation:"Add 2–4 relevant hashtags."});

  return {
    stats:{ wordCount:words.length, hashtags, mentionCount:mentions.length },
    advice,
    altText: words.slice(0,12).join(" ") || file.name
  };
}
