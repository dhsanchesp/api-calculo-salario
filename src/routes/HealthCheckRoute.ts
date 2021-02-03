import * as health from '@cloudnative/health';
let healthCheck = new health.HealthChecker();

const startPromise = (): Promise<void> => new Promise(function (resolve, _reject) {
  setTimeout(function() {
    console.log("APP Started");
    resolve();
  }, 10);
});

let startCheck = new health.StartupCheck("startCheck", startPromise);
healthCheck.registerStartupCheck(startCheck);


const livePromise = (): Promise<void> => new Promise(function (resolve, _reject) {
  setTimeout(function() {
    console.log("APP is alive");
    resolve();
  }, 10)
});

let livecheck = new health.LivenessCheck('LivenessCheck', livePromise);
healthCheck.registerLivenessCheck(livecheck);

let shutdownPromise = (): Promise<void> => new Promise(function (resolve, _reject) {
  setTimeout(function() {
    console.log('APP Down');
    resolve();
  }, 10);
});
let shutdownCheck = new health.ShutdownCheck('shutdownCheck', shutdownPromise);
healthCheck.registerShutdownCheck(shutdownCheck);


let readyPromise = (): Promise<void> => new Promise(function (resolve, _reject) {
  setTimeout(function() {
    console.log("APP is ready");
    resolve();
  }, 10);
});
let readyCheck = new health.ReadinessCheck('readyCheck', readyPromise);
healthCheck.registerReadinessCheck(readyCheck);

export {health, healthCheck};
