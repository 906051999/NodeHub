import yaml from 'js-yaml';

export class ClashParser {
  constructor(subscriptionData) {
    this.subscriptionData = subscriptionData;
  }

  parse() {
    let remainingTraffic = 0;
    let expirationDate = null;
    let nodeCount = 0;

    try {
      const clashConfig = yaml.load(this.subscriptionData);
      
      // 解析节点数量
      if (clashConfig.proxies && Array.isArray(clashConfig.proxies)) {
        nodeCount = clashConfig.proxies.filter(proxy => !this.isInfoNode(proxy.name)).length;
      }

      // 解析剩余流量和到期时间
      if (clashConfig.proxies && Array.isArray(clashConfig.proxies)) {
        for (const proxy of clashConfig.proxies) {
          const infoData = this.parseInfoNode(proxy.name);
          if (infoData.remainingTraffic !== null) {
            remainingTraffic = infoData.remainingTraffic;
          }
          if (infoData.expirationDate !== null) {
            expirationDate = infoData.expirationDate;
          }
        }
      }
    } catch (error) {
      console.error('Error parsing Clash configuration:', error);
    }

    return { remainingTraffic, expirationDate, nodeCount };
  }

  isInfoNode(name) {
    const infoPatterns = [
      /剩余流量/,
      /距离下次重置剩余/,
      /套餐到期/,
      /剩余.*天/,
      /过期时间/,
      /剩余：/
    ];
    return infoPatterns.some(pattern => pattern.test(name));
  }

  parseInfoNode(name) {
    let remainingTraffic = null;
    let expirationDate = null;

    // 解析剩余流量
    const trafficMatch = name.match(/剩余流量：(.*?)\s/);
    if (trafficMatch) {
      remainingTraffic = this.parseTraffic(trafficMatch[1]);
    }

    // 解析到期时间
    const dateMatch = name.match(/套餐到期：(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      expirationDate = dateMatch[1];
    }

    return { remainingTraffic, expirationDate };
  }

  parseTraffic(trafficString) {
    const units = {
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024
    };
    const match = trafficString.match(/^([\d.]+)\s*([GMKB]+)$/i);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2].toUpperCase();
      return value * units[unit];
    }
    return 0;
  }
}
