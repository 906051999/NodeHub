import { ClashParser } from './parsers/clashParser';

export function createSubscriptionParser(subscriptionData) {
  // 目前只支持 Clash 配置，所以直接返回 ClashParser
  // 未来可以在这里添加其他类型的判断逻辑
  return new ClashParser(subscriptionData);
}
