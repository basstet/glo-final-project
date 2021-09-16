const calc = () => {
  if (!document.getElementById('calc')) {
    return;
  }
  const calcBlock = document.getElementById('calc'),
        calcType = document.getElementById('calc-type'),
        calcMaterial = document.getElementById('calc-type-material'),
        calcInput = document.getElementById('calc-input'),
        calcTotal = document.getElementById('calc-total');

  // подсчет итоговой суммы:
  const countTotal = () => {
    const typeValue = calcType.options[calcType.selectedIndex].value,
          materialValue = calcMaterial.options[calcMaterial.selectedIndex].value,
          inputValue = +calcInput.value;

    if (typeValue && materialValue && inputValue) {
      const total = inputValue * typeValue * materialValue;
      calcTotal.value = total;
    } else {
      calcTotal.value = '';
    }
  };

  // изменение "Итого" при изменении значения полей:
  calcBlock.addEventListener('change', event => {
    if (event.target.matches('select, input')) {
      calcTotal.value = '';
      countTotal();
    }
  });

  // запрет ввода не цифр:
  calcBlock.addEventListener('input', event => {
    if (event.target.matches('input[type="number"]')) {
      event.target.value = event.target.value.replace(/\D/g, '');
    }
  });
};

export default calc;
