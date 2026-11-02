using CommunityToolkit.Mvvm.ComponentModel;
using System.Reflection;
using System.Text.Json;

var sample = new FixtureValue();
var changes = 0;
sample.PropertyChanged += (_, args) => { if (args.PropertyName == nameof(FixtureValue.Value)) changes++; };
sample.Value = "adopted";
sample.Value = "adopted";
if (changes != 1 || sample.Value != "adopted") throw new InvalidOperationException("MVVM_CONSUMPTION");
Console.WriteLine(JsonSerializer.Serialize(new { consumer = "CommunityToolkit.Mvvm", version = typeof(ObservableObject).Assembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion, result = "PASS" }));

sealed class FixtureValue : ObservableObject
{
    private string value = "before";
    public string Value { get => value; set => SetProperty(ref this.value, value); }
}
