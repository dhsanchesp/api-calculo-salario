import * as health from '@cloudnative/health';
const healthCheck = new health.HealthChecker();

const startPromise = (): Promise<void> => new Promise((resolve, _reject) => {
  setTimeout(() => {
    console.log("APP Started");
    resolve();
  }, 10);
});

const startCheck = new health.StartupCheck("startCheck", startPromise);
healthCheck.registerStartupCheck(startCheck);


const livePromise = (): Promise<void> => new Promise((resolve, _reject) => {
  setTimeout(() => {
    console.log("APP is alive");
    resolve();
  }, 10)
});

const livecheck = new health.LivenessCheck('LivenessCheck', livePromise);
healthCheck.registerLivenessCheck(livecheck);

const shutdownPromise = (): Promise<void> => new Promise((resolve, _reject) => {
  setTimeout(() => {
    console.log('APP Down');
    resolve();
  }, 10);
});
const shutdownCheck = new health.ShutdownCheck('shutdownCheck', shutdownPromise);
healthCheck.registerShutdownCheck(shutdownCheck);


const readyPromise = (): Promise<void> => new Promise((resolve, _reject) => {
  setTimeout(() =>  {
    console.log("APP is ready");
    resolve();
  }, 10);
});
const readyCheck = new health.ReadinessCheck('readyCheck', readyPromise);
healthCheck.registerReadinessCheck(readyCheck);

export {health, healthCheck};
