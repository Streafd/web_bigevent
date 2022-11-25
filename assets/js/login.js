window.onload = function () {
  const loginBox = document.querySelector('.login-box')
  const regBox = document.querySelector('.reg-box')
  const reg = document.querySelector('#link_reg')
  const login = document.querySelector('#link_login')

  reg.addEventListener('click', function () {
    loginBox.classList.toggle('hidden')
    regBox.classList.toggle('hidden')
  })
  login.addEventListener('click', function () {
    loginBox.classList.toggle('hidden')
    regBox.classList.toggle('hidden')
  })
}
