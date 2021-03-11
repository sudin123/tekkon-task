<template>
  <div class="messages-list-container">
    <div class="messages-list">
      <div class="message-data">
        <div class="message-info">
          <p class="messenger-name">Sudin gurung</p>
          <p class="messenger-timestamp">6:10pm</p>
        </div>
        <div class="message-inbox">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
        </div>
      </div>
      <div class="message-data">
        <div class="message-info">
          <p class="messenger-name">Hari Krishna</p>
          <p class="messenger-timestamp">6:10pm</p>
        </div>
        <div class="message-inbox">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
        </div>
      </div>
      <div class="message-data">
        <div class="message-info">
          <p class="messenger-name">Sudin Gurung</p>
          <p class="messenger-timestamp">6:10pm</p>
        </div>
        <div class="message-inbox">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
        </div>
      </div>
    </div>

    <div class="is-typing">
      <p style="font-style:italic;color:black;padding:12px">
        Sudin is typing ...
      </p>
    </div>

    <div class="message-input">
      <b-input maxlength="200" type="textarea"></b-input>
    </div>
  </div>
</template>

<style scoped>
.messages-list-container {
  display: flex;
  flex-direction: column;
}

.messages-list {
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 70vh;
  justify-content: flex-end;
}
.message-data {
  padding-bottom: 18px;
}
.message-info {
  display: flex;
  /* flex-direction: column; */
}

.messenger-name {
  font-weight: bold;
  font-size: 15px;
  /* margin-right: 10px; */
}
.messenger-timestamp {
  font-size: 12px;
  font-weight: lighter;
  margin-top: 5px;
}
.messenger-name,
.messenger-timestamp {
  color: black;
}
.message-inbox {
  font-size: 14px;
  line-height: 25px;
}
.message-input {
  margin-bottom: 20px;
  padding: 12px;
}
</style>
