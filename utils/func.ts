import { BigNumber, ethers } from 'ethers';

const { utils } = ethers;

export function stringToBytes32(str: string): string {
  return utils.formatBytes32String(str);
}

export function randomBytes(len: number): string {
  return utils.hexlify(utils.randomBytes(len));
}

// export function pickStruct(struct: any): object {
//   return Object.keys(struct).reduce((acc: any, key: any) => {
//     if (Number.isNaN(Number(key))) {
//       let value = struct[key];
//       return {
//         ...acc,
//         [key]: struct[key] === BigNumber.isBigNumber(value) ? BigNumber.from(value) : value,
//       };
//     } else {
//       return acc;
//     }
//   }, {});
// }


export function formatStruct(struct: Object): object {  
  const res: any = {};
  for (const [key, value] of Object.entries(struct)) {
    if (!isNaN(parseInt(key))) {
      continue;
    } 
    if (BigNumber.isBigNumber(value)) res[key] = BigNumber.from(value)
    else res[`${key}`] = value;
  }
  return res;
}
