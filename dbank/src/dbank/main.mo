import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue = 300: Float;
  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  Debug.print("hello");
  Debug.print(debug_show(currentValue));

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue))
  };

  public func widthdrawl(amount: Float) {

    if ((currentValue - amount): Float >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue))
    }
    else {
      Debug.print("Error, amount too large.")
    };
  };

  public query func checkBalance(): async Float {
      return currentValue;
  };

  public func compound(): async Float {
    currentValue := 300;
    var currentTime = Time.now();
    var changeTimeSec = (currentTime - startTime) / 1_000_000_000; // Gives seconds so we need to convert to seconds by dividing
    currentValue := currentValue * (1.01 ** Float.fromInt(changeTimeSec));
    startTime := currentTime;
    Debug.print(debug_show(currentValue));
    return currentValue;
  }
}