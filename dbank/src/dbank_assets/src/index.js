import { dbank } from "../../declarations/dbank";

async function updateBalance() {
  const balance = await dbank.checkBalance()
  document.querySelector('#num-value').innerText = balance.toFixed(2) 
}

document.addEventListener('DOMContentLoaded', async ()=> {
  const deposit = document.querySelector('.deposit')
  const withdraw = document.querySelector('.withdraw')

  updateBalance();

  document.querySelectorAll('.form-control').forEach(element => {
    element.addEventListener('input', ()=> {
      if (deposit.value != '') {
        withdraw.value = '';
        withdraw.disabled = true;
      }
      else if (withdraw.value != '') {
        deposit.value = '';
        deposit.disabled = true;
      }
      else {
        deposit.disabled = false;
        withdraw.disabled = false;
      }
    })
  })

  document.querySelector('form').addEventListener('submit', async (event)=>{
    event.preventDefault();

    if (deposit.value === '' && withdraw.value === '') {
      return
    }

    document.querySelector('.btn').disabled = true;

    if (deposit.value != '') {
      await dbank.topUp(parseFloat(deposit.value))
    }
    else {
      await dbank.widthdrawl(parseFloat(withdraw.value))
    }

    updateBalance()

    event.target.reset();
    deposit.disabled = false;
    withdraw.disabled = false;
    document.querySelector('.btn').disabled = false;
  }) 
})