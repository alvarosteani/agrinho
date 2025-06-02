let playerX = 100;
let playerY = 330;
let lixos = [];
let arvores = [];
let pontos = 0;
let mensagens = [];
let fase = 1;
let lixoColetado = 0;

function setup() {
  createCanvas(900, 450);

  gerarLixos(5);

  let botao = createButton("🌱 Plantar Árvore");
  botao.position(10, 10);
  botao.mousePressed(plantarArvore);
}

function draw() {
  background(120, 200, 120); // chão
  desenharCenario();

  desenharPersonagem();

  // Lixos
  for (let lixo of lixos) {
    fill(100);
    rect(lixo.x, lixo.y, 25, 25, 5);
    fill(60);
    rect(lixo.x + 5, lixo.y + 5, 15, 15, 3);
  }

  // Árvores
  for (let a of arvores) {
    fill(101, 67, 33);
    rect(a.x + 10, a.y + 30, 10, 30);
    fill(34, 139, 34);
    ellipse(a.x + 15, a.y + 25, 50, 50);
  }

  // HUD
  fill(255);
  textSize(18);
  text("🌟 Pontos: " + pontos, width - 180, 30);
  text("🗑️ Lixo restante: " + lixos.length, width - 180, 55);
  text("🚩 Fase: " + fase, width - 180, 80);

  // Mensagens educativas
  textSize(16);
  fill(20);
  for (let i = 0; i < mensagens.length; i++) {
    text(mensagens[i].texto, 20, 60 + i * 20);
    if (millis() - mensagens[i].tempo > 4000) {
      mensagens.splice(i, 1);
    }
  }

  verificarFase();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    playerX = constrain(playerX + 25, 0, width - 40);
  } else if (keyCode === LEFT_ARROW) {
    playerX = constrain(playerX - 25, 0, width - 40);
  }

  for (let i = lixos.length - 1; i >= 0; i--) {
    if (dist(playerX + 20, playerY + 30, lixos[i].x + 10, lixos[i].y + 10) < 40) {
      lixos.splice(i, 1);
      pontos += 10;
      lixoColetado++;
      mensagens.push({ texto: "♻️ Ótimo! Lixo coletado!", tempo: millis() });
    }
  }
}

function plantarArvore() {
  if (arvores.length < 15) {
    arvores.push(createVector(playerX, playerY));
    pontos += 5;
    mensagens.push({ texto: "🌳 Uma nova árvore foi plantada!", tempo: millis() });
  }
}

function desenharPersonagem() {
  // Corpo
  fill(0, 102, 204);
  rect(playerX, playerY, 40, 60, 10);
  // Cabeça
  fill(255, 220, 180);
  ellipse(playerX + 20, playerY - 20, 40, 40);
  // Sombra
  fill(0, 0, 0, 50);
  ellipse(playerX + 20, playerY + 65, 30, 10);
}

function desenharCenario() {
  // Céu
  noStroke();
  fill(135, 206, 235);
  rect(0, 0, width, 200);
  // Sol
  fill(255, 255, 0, 180);
  ellipse(80, 80, 100, 100);
  // Montanhas
  fill(80, 160, 90);
  triangle(200, 200, 300, 50, 400, 200);
  triangle(400, 200, 500, 80, 600, 200);
}

function gerarLixos(qtd) {
  for (let i = 0; i < qtd; i++) {
    lixos.push(createVector(random(100, width - 100), 350));
  }
}

function verificarFase() {
  if (lixos.length === 0) {
    fase++;
    gerarLixos(3 + fase);
    mensagens.push({ texto: "🎉 Nova fase! Continue ajudando!", tempo: millis() });
  }
}
