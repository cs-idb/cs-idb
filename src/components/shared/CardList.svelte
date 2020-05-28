<style>
.cards {
  margin: 20px auto;
  width: 0%;
}

@media screen and (max-width: 710px) {
  .cards {
    width: 100%;
  }
}
@media screen and (min-width: 710px) and (max-width: 1050px) {
  .cards {
    width: 630px;
  }
}
@media screen and (min-width: 1050px) and (max-width: 1390px) {
  .cards {
    width: 940px;
  }
}
@media screen and (min-width: 1390px) and (max-width: 1730px) {
  .cards {
    width: 1250px;
  }
}
@media screen and (min-width: 1730px) and (max-width: 10000px) {
  .cards {
    width: 1560px;
  }
}
</style>

<div class="cards">
  <slot />
</div>