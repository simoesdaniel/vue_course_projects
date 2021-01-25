function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      attackCount: 0,
      winner: null,
      attackLog: [],
    };
  },
  computed: {
    monsterBarStyles() {
      return this.monsterHealth < 0
        ? { width: "0%" }
        : { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      return this.playerHealth < 0
        ? { width: "0%" }
        : { width: this.playerHealth + "%" };
    },
    enableSpecialAttack() {
      return this.attackCount % 3 !== 0;
    },
    enableHealAttack() {
      return this.attackCount % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //lost
        this.winner = "monster";
      } else {
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      } else {
      }
    },
  },
  methods: {
    startGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.attackCount = 0;
      this.winner = null;
      this.attackLog = [];
    },
    attackMonster() {
      const damage = getRandomDamage(5, 12);
      this.monsterHealth -= damage;
      this.attackCount++;
      this.attackPlayer();
      this.addLogMessage("player", "attacked", damage);
    },

    attackPlayer() {
      const damage = getRandomDamage(8, 15);
      this.playerHealth -= damage;
      this.addLogMessage("monster", "attacked", damage);
    },

    speciallyAttackMonster() {
      const damage = getRandomDamage(10, 25);
      this.monsterHealth -= damage;
      this.addLogMessage("player", "speacially attacked", damage);
      this.attackPlayer();
      this.attackCount++;
    },
    healPlayer() {
      const healAmount = getRandomDamage(8, 20);
      if (this.playerHealth + healAmount < 100) {
        this.playerHealth += healAmount;
      } else {
        this.playerHealth = 100;
      }
      this.addLogMessage("player", "heals", healAmount);
      this.attackPlayer();
      this.attackCount++;
    },
    surrenderGame() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.attackLog.unshift({ who: who, what: what, value: value });
    },
  },
});

app.mount("#game");
