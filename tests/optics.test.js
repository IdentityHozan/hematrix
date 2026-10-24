import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyPattern } from '../reactions.js';

test('synthetic positive fields have more connected cells than dispersed negative fields', () => {
  const negative=classifyPattern('negative');
  const positive=classifyPattern('positive');
  const weak=classifyPattern('weak');
  assert.equal(negative.classification,'No reactivity detected');
  assert.equal(positive.classification,'Reactive pattern');
  assert.ok(positive.clusterIndex > .65);
  assert.ok(negative.clusterIndex < .10);
  assert.ok(weak.clusterIndex > negative.clusterIndex);
  assert.ok(weak.clusterIndex < positive.clusterIndex);
});

test('optical faults remain invalid even when underlying synthetic cells are dispersed', () => {
  for(const pattern of ['bubble','illumination','blur']) {
    const result=classifyPattern(pattern);
    assert.equal(result.classification,'Invalid optical field');
    assert.ok(result.quality<50);
    assert.notEqual(result.classification,'No reactivity detected');
  }
});

test('weak and equivocal patterns retain an investigation state', () => {
  assert.match(classifyPattern('weak').classification,/review/);
  assert.match(classifyPattern('equivocal').classification,/investigate/);
});

test('reference descriptors are reproducible and unknown inputs are not forced into a result', () => {
  assert.deepEqual(classifyPattern('positive'),classifyPattern('positive'));
  const unknown=classifyPattern('unavailable');
  assert.equal(unknown.classification,'Unable to interpret');
  assert.equal(unknown.clusterIndex,null);
  assert.equal(unknown.quality,0);
});
