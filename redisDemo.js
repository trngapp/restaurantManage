const {createClient}=require("redis");
async function nodeRedisDemo(amountPaid) {
    try {
      const client = createClient();
      await client.connect();
      const Amount = await client.get('amountPaid');
      if(Amount==2)
      {
        console.log("yay");
      }
      else{
        await client.set('amountPaid', amountPaid);
      }


      console.log(Amount);

    /*  const numAdded = await client.zAdd('vehicles', [
        {
          score: 4,
          value: 'car',
        },
        {
          score: 2,
          value: 'bike',
        },
      ]);
      console.log(`Added ${numAdded} items.`);

      for await (const { score, value } of client.zScanIterator('vehicles')) {
        console.log(`${value} -> ${score}`);
      }*/

      await client.quit();
    } catch (e) {
      console.error(e);
    }
}
module.exports=nodeRedisDemo;
//nodeRedisDemo(2);
